import Response from 'lib/response';
import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from 'lib/supabase';
import { parse } from 'node-html-parser';

type AddPortfolioResponse = Response<{
  feedUrl: string;
}>;

const allowedPlaforms = ['wordpress', 'wix', 'custom', 'other'];

export default async function handleAddPortfolio(
  req: NextApiRequest,
  res: NextApiResponse<AddPortfolioResponse>
) {
  const {
    body: { url, platform },
  } = req;
  try {
    if (req.method !== 'POST') throw new Error('Method is not allowed.');
    if (!url) throw new Error('URL not provided.');
    if (!platform) throw new Error('Plaform not provided.');
    if (Array.isArray(platform) || !allowedPlaforms.includes(platform))
      throw new Error('Plaform not allowed.');

    // check if the url is valid
    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (error) {
      throw new Error(
        'URL adresa je neplatná. Zkontrolujte zda je v celém tvaru, včetně https:// jako v adresovém řádku prohlížeče.'
      );
    }
    const urlRes = await fetch(urlObj);
    if (!urlRes.ok) throw new Error('Na adrese jsme nenašli žádnou stránku.');

    // find feed
    if (platform !== 'custom') {
      const html = parse(await urlRes.text());
      const rssUrls = html
        .querySelectorAll('link[rel="alternate"][type="application/rss+xml"]')
        .map((link) => link.getAttribute('href'));
      // assume the right link url is the shortest one
      const shortest = rssUrls.reduce((a, b) => {
        return a.length < b.length ? a : b;
      });
      urlObj = new URL(shortest);
      const foundFeedRes = await fetch(urlObj);
      if (!foundFeedRes.ok) {
        console.error(`Portfolio feed fetch failed: ${urlObj.toString()}}`);
        throw new Error('Připojení portfolia se nezdařilo.');
      }
    }
    // check if portfolio exists in db
    const { error: portfolioExists } = await supabase
      .from('portfolios')
      .select('id')
      .eq('feed_url', urlObj.toString())
      .limit(1)
      .single();
    if (!portfolioExists) throw new Error('Portfolio již je připojeno.');

    // write portfolio to database
    const { data: newPortfolio, error: newPortfolioError } = await supabase
      .from('portfolios')
      .insert({ feed_url: urlObj.toString() })
      .select()
      .limit(1)
      .single();
    if (newPortfolioError) {
      console.error(`Inserting portfolio failed: ${urlObj.toString()}}`);
      throw new Error('Připojení portfolia se nezdařilo.');
    }
    console.log(newPortfolio);
    // fetch portfolio posts
    await supabase.functions.invoke('feed-source', {
      body: { portfolio_id: newPortfolio.id, feed_url: newPortfolio.feed_url },
    });
    res.status(200).json({ feedUrl: newPortfolio.feed_url });
  } catch (error: any) {
    res
      .status(500)
      .json({ statusCode: 500, isError: true, message: error.message });
  }
}
