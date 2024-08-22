import { auth } from 'auth';
import { cache } from 'react';
import { db } from 'db';
import { Avatar } from 'components/avatar';
import { LinkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Button } from 'components/ui/button-radix';

const loadProfileInfo = cache(async (username: string) => {
  const session = await auth();
  const profile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.username, username),
    with: {
      portfolios: true,
    },
  });
  if (!profile) return null;
  if (!profile.isPublic && session?.user?.id !== profile.id) return null;
  return {
    profile,
    session: session,
    canEdit: session?.user?.id === profile?.id,
  };
});

export async function ProfileHeader(props: { userName: string }) {
  const profile = await loadProfileInfo(props.userName);
  if (!profile) return null;
  const { fullName, username, image, portfolios, bio } = profile.profile;

  return (
    <div className="flex items-center">
      <Avatar
        imageUrl={image || ''}
        className="rounded-full border border-smoke w-32 h-32 mr-2 text-3xl sm:mr-4"
        size={72}
        name={fullName || username}
      />
      <div className="mr-14">
        <div className="flex space-x-4">
          <h1 className="text-2xl w-[224px] mb-1 tracking-tight text-text sm:text-3xl md:text-3xl">
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
  );
}
