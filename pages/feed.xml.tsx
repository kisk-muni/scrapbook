import RSS from 'rss';
import supabase from '../lib/supabase';

const SITE_URL = 'https://scrapbook.kisk.cz';

export async function getServerSideProps({ res }) {
  const feed = new RSS({
    title: 'KISKový Scrapbook',
    description: 'Co se právě učíme a na čem každý den pracujeme.',
    site_url: SITE_URL,
    feed_url: SITE_URL + '/feed.xml',
    image_url: SITE_URL + '/homepage-screenshot.png',
    about_url: SITE_URL + '/about',
    bugs: {
      url: 'https://github.com/kisk-muni/scrapbook/issues',
      email: 'cernockyd!zavinac!mail.muni.cz',
    },
  });

  const { data, error } = await supabase
    .from('portfolio_posts')
    .select(
      `
        title,
        description,
        url,
        id,
        published_at,
        thumbnail_url, 
        portfolios(
          id,
          title,
          url,
          feed_url,
          image_url
        )
    `
    )
    .order('published_at', { ascending: false })
    .limit(10);

  if (!error)
    data.map((post) => {
      try {
        feed.item({
          title: post?.title,
          url: post?.url,
          date: new Date(post?.published_at).toISOString(),
          description: post?.description,
          author: {
            name: post?.portfolios[0]?.title,
            url: SITE_URL + '/portfolio?feed=' + post.portfolios[0]?.feed_url,
          },
        });
      } catch (error) {
        console.log(
          `Error adding post ${post?.id} to feed with message: ${error?.message}`
        );
      }
    });
  else console.log(`Error getting recent posts with message: ${error}`);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
}

export default function RSSFeed() {
  return null;
}
