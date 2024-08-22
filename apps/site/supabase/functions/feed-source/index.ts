// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from 'jsr:@supabase/supabase-js@2';
import { parseFeed } from 'jsr:@mikaelporttila/rss@1.0.3';

async function sourceFeed(
  supabase: any,
  feed_url: string,
  portfolio_id: string
) {
  const response = await fetch(feed_url);
  const xml = await response.text();
  const feed = await parseFeed(xml);

  try {
    // [cernockyd] naive wordpress support
    // fields can be eventually accessed using DublinCore and MediaRss enums
    const parsed = feed?.entries?.map((item) => ({
      portfolio_id,
      title: item?.title?.value || undefined,
      url: item?.links[0]?.href || undefined,
      published_at: item?.published || undefined,
      description:
        item?.description?.value || item?.content?.value || undefined,

      // following media type is not declared in library’s typings but exits on the object
      // https://github.com/MikaelPorttila/rss/blob/5632aa76f1bede380da519118841e0a8dacbd3ff/src/types/media_rss.ts#L47
      thumbnail_url: (item as any)['media:thumbnail']?.url || null,
    }));

    console.log('FEED ENTRIES', feed.entries);
    console.log('PARSED', parsed);

    const { data, error } = await supabase
      .from('portfolio_posts')
      .upsert(parsed, {
        ignoreDuplicates: true,
        onConflict: 'url',
      })
      .select();

    console.log('DATA', data);
    console.log('ERR', error);

    const { data: _portfolio, error: _portfolio_err } = await supabase
      .from('portfolios')
      .update({
        last_crawl_feed_status: 'success',
        last_crawled_feed_at: new Date().toISOString(),
        last_crawl_feed_message: null,
      })
      .eq('id', portfolio_id);

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    await supabase
      .from('portfolios')
      .update({
        last_crawl_feed_status: 'error',
        last_crawled_feed_at: new Date().toISOString(),
        last_crawl_feed_message: error.message,
      })
      .eq('id', portfolio_id);
  }
}

Deno.serve(async (req) => {
  const { method, headers } = req;
  try {
    if (method !== 'POST') throw new Error('Invalid method.');
    const auth = headers.get('Authorization');
    if (!auth) throw new Error('Authorization not provided');
    const body = await req.json();
    const { feed_url, portfolio_id } = body;
    if (!feed_url) throw new Error('Feed url not provided.');
    if (!portfolio_id) throw new Error('Portfolio id not provided.');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    return sourceFeed(supabase, feed_url, portfolio_id);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/feed-source' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"feed_url":"https://veronikabatelkova.cz/feed/", "portfolio_id": 3}'
