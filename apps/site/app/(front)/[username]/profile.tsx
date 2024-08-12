import { auth } from 'auth';
import { cache } from 'react';
import { db } from 'db';
import { Avatar } from 'components/avatar';
import { LinkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { parseISO } from 'date-fns';
import { ProfilePostCard } from 'components/profile-post-card';
import { Button } from 'components/ui/button-radix';
import { PortfolioPosts, Post } from 'db/schema';
import { UniversalPost } from 'lib/actions/get-posts';

const loadProfile = cache(async (username: string) => {
  const session = await auth();
  const profile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.username, username),
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

export async function Profile(props: { userName?: string }) {
  const profile = await loadProfile(props.userName);
  if (!profile) return null;

  const { fullName, username, image, portfolios, profilesToPosts, bio } =
    profile.profile;
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
    <div>
      <div className="flex items-center">
        <Avatar
          imageUrl={
            image || (portfolios.length ? portfolios[0].imageUrl : '') || ''
          }
          className="rounded-full border border-smoke w-32 h-32 mr-2 text-3xl sm:mr-4"
          size={72}
          name={fullName || username}
        />
        <div>
          <div className="flex space-x-4">
            <h1 className="text-2xl mb-1 tracking-tight text-text sm:text-3xl md:text-3xl">
              <span className="block xl:inline font-extrabold">{fullName}</span>
            </h1>
            {profile.canEdit && (
              <Button
                asChild
                variant="subtle"
                size="sm"
                rounded="full"
                className="mr-2 pt-0.5 pb-0.5"
              >
                <Link href="/settings/profile">Upravit</Link>
              </Button>
            )}
          </div>
          {bio && <p className="text-lg text-text mb-3">{bio}</p>}
          <div className="flex gap-2">
            {portfolios && portfolios.length != 0 && (
              <Link
                target="_blank"
                href={portfolios[0].url}
                className="flex items-center text-sm bg-blue hover:opacity-90 text-background rounded-full px-2 py-0.5"
              >
                <LinkIcon className="w-4 h-4 mr-0.5 -ml-px -mt-px" /> Portfolio
              </Link>
            )}
          </div>{' '}
        </div>
      </div>
      <div className="mt-10 md:mt-12 overflow-hidden rounded-xl grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {portfolios?.length != 0 &&
          portfolioPosts &&
          portfolioPosts?.map((item, i) => (
            <ProfilePostCard key={i} data={item} index={i + 1} />
          ))}
      </div>
    </div>
  );
}
