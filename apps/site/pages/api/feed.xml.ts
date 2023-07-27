import { cloudinaryImageFetch } from 'lib/cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';
import RSS from 'rss';
import supabase from '../../lib/supabase';

const SITE_URL = 'https://scrapbook.kisk.cz';

export default async function getServerSideProps(
  _req: NextApiRequest,
  res: NextApiResponse<string>
) {
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

  type CuratedPost = {
    id: string;
    title: string | null;
    url: string | null;
    published_at: string | null;
    thumbnail_url: string | null;
    description: string | null;
    portfolio_id: string | null;
    portfolio_title: string | null;
    portfolio_name: string | null;
    portfolio_feed_url: string | null;
    portfolio_image: string | null;
  };

  const { data, error } = await supabase.rpc('get_curated_posts');

  const curatedPosts = data as unknown as CuratedPost[];

  if (!error)
    curatedPosts.map((post) => {
      try {
        feed.item({
          title: post?.title,
          url: post?.url,
          date: new Date(post?.published_at).toISOString(),
          description: post?.description,
          author:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            post.portfolio_title ||
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            post.portfolio_title ||
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
                post.portfolio_feed_url, // feed_url
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
    'public, s-maxage=300, stale-while-revalidate=150'
  );
  res.end(feed.xml({ indent: true }));
}
