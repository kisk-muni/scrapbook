import useApiInfinite from 'lib/use-api-infinite';

export interface PostItemProps {
  id: string;
  title: string;
  published_at: string;
  url: string;
  description: string;
}

export default function usePortfoliosList() {
  return useApiInfinite<PostItemProps>(
    `https://kiggmvgmzoffneyfrvuz.supabase.co/rest/v1/portfolio_posts?select=title,description,url,id,published_at&order=published_at.desc&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZ2dtdmdtem9mZm5leWZydnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc5MjE1NzYsImV4cCI6MTk4MzQ5NzU3Nn0.74Wy0yL0oWfA5M1koxzpswBUwAwFS8RMPpeugRaWVw4`,
    80
  );
}
