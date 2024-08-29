import { auth } from 'auth';
import { cache } from 'react';
import { db } from 'db';
import { BlogCard } from './blog-card';
import { Portfolio } from 'db/schema';

export type PortfolioWithPosts = Portfolio & {
  portfolioPosts: {
    id: string;
  }[];
  portfolioPages: {
    id: string;
  }[];
};

const loadProfileBlogs = cache(async () => {
  const session = await auth();
  const portfolios = await db.query.portfolios.findMany({
    where: (portfolios, { eq }) => eq(portfolios.profileId, session.user.id),
    with: {
      portfolioPosts: {
        columns: {
          id: true,
        },
      },
      portfolioPages: {
        columns: {
          id: true,
        },
      },
    },
  });
  if (!portfolios) return null;
  return portfolios;
});

export async function ProfileBlogs() {
  const portfolios = await loadProfileBlogs();
  if (!portfolios) return null;

  return (
    <div className="space-y-4">
      {portfolios.map((portfolio, i) => {
        return <BlogCard key={i} portfolio={portfolio} />;
      })}
    </div>
  );
}
