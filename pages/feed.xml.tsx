import { cloudinaryImageFetch } from 'lib/cloudinary';
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
          name,
          url,
          feed_url,
          image_url
        )
    `
    )
    .order('published_at', { ascending: false })
    .limit(40);

  if (!error)
    data.map((post) => {
      try {
        feed.item({
          title: post?.title,
          url: post?.url,
          date: new Date(post?.published_at).toISOString(),
          description: post?.description,
          author:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (post?.portfolios as any).title ||
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (post?.portfolios as any).name ||
            'Uživatel Scrapbooku',
          ...(post.thumbnail_url && {
            enclosure: {
              url: cloudinaryImageFetch(
                post.thumbnail_url,
                'ar_1.333,b_auto,c_pad,w_800'
              ),
            },
          }),
          custom_elements: [
            {
              creator_url:
                SITE_URL +
                '/portfolio?feed=' +
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (post?.portfolios as any).feed_url,
            },
          ],
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
