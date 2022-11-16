import useApiInfinite from 'lib/use-api-infinite';

export interface PostItemProps {
  id: string;
  title: string | null;
  published_at: string | null;
  url: string | null;
  description: string | null;
  thumbnail_url: string | null;
  portfolios: {
    title: string | null;
    url: string | null;
    image_url: string | null;
  };
}

export default function usePortfoliosList() {
  return useApiInfinite<PostItemProps>(
    `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/rest/v1/portfolio_posts?select=title,description,url,id,published_at,thumbnail_url,portfolios(title,url,image_url)&order=published_at.desc&apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    40
  );
}
