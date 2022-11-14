import useApiInfinite from 'lib/use-api-infinite';

export interface PostItemProps {
  id: string;
  title: string;
  published_at: string;
  url: string;
  description: string;
  portfolios: {
    title: string;
    url: string;
  };
}

export default function usePortfoliosList() {
  return useApiInfinite<PostItemProps>(
    `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/rest/v1/portfolio_posts?select=title,description,url,id,published_at,portfolios(title,url)&order=published_at.desc&apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    40
  );
}
