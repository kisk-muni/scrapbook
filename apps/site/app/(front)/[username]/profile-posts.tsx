import { auth } from 'auth';
import { cache } from 'react';
import { db } from 'db';
import { ProfilePostCard } from 'components/profile-post-card';
import { UniversalPost } from 'lib/actions/get-posts';

const loadProfilePosts = cache(async (userName: string) => {
  const session = await auth();
  const profile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.username, userName),
    with: {
      profilesToPosts: {
        with: {
          post: true,
        },
      },
      portfolios: {
        with: {
          portfolioPosts: true,
        },
      },
    },
  });
  if (!profile) return null;
  return {
    profile,
    session: session,
    canEdit: session?.user?.id === profile?.id,
  };
});

export async function ProfilePosts(props: { userName?: string }) {
  const profile = await loadProfilePosts(props.userName);
  if (!profile) return null;
  const { portfolios, profilesToPosts } = profile.profile;
  const posts = profilesToPosts.map(
    (p) => p.post
  ) as unknown as UniversalPost[];
  const portfolioPosts = (
    portfolios.reduce(
      (acc, curr) => [...acc, ...(curr.portfolioPosts || [])],
      [] as UniversalPost[]
    ) as UniversalPost[]
  )
    .concat(posts)
    .sort((a, b) => {
      if (!a.publishedAt) return 1;
      if (!b.publishedAt) return -1;
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    });
  return (
    <div className="mt-10 md:mt-12 overflow-hidden rounded-xl grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {portfolios?.length != 0 &&
        portfolioPosts &&
        portfolioPosts?.map((item, i) => (
          <ProfilePostCard key={i} data={item} index={i + 1} />
        ))}
    </div>
  );
}
