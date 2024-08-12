'use client';
import { usePlausible } from 'next-plausible';
import Link from 'next/link';
import { Avatar } from './avatar';
import { formatRelative } from 'date-fns';
import csLocale from 'date-fns/locale/cs';
import { PostDescription } from './post-description';
import { PostImage } from './post-image';
import { UniversalPost } from 'lib/actions/get-posts';

const formatRelativeLocale = {
  lastWeek: "eeee 'v' p",
  yesterday: "'včera v' p",
  today: "'dnes v' p",
  tomorrow: "'zítra v' p",
  nextWeek: 'do MMMM yyyy',
  other: 'do MMMM yyyy',
};

interface CardProps {
  index: number;
  data: UniversalPost;
  width: number;
}

const locale = {
  ...csLocale,
  formatRelative: (token) => formatRelativeLocale[token],
};

export function PostCard({ data }: CardProps) {
  const plausible = usePlausible();
  // if (data.skeleton) return <PostCard.Skeleton />;
  return (
    <div className="bg-white rounded-xl mb-4 mr-4 md:mb-6 md:mr-6">
      <Link
        className="cursor-pointer"
        onClick={() => plausible('Portfolio Link: Click')}
        href={'/' + data?.profile?.username}
      >
        <div className="flex flex-column pt-3 px-3 mb-2">
          <Avatar
            className="rounded-full w-12 h-12 mr-2"
            name={data.profile?.fullName || 'Beze jména'}
            size={48}
            imageUrl={data.profile?.image}
          />
          <div className="mt-1">
            {data.profile?.fullName && (
              <p className="mb-0 mt-0.5 text-text text-base leading-5 font-bold hover:text-dark">
                {data.profile?.fullName
                  ? data.profile?.fullName
                  : data.profile?.username || 'Beze jména'}
              </p>
            )}
            <p className="text-muted text-base leading-4">
              {data?.publishedAt &&
                formatRelative(data?.publishedAt, new Date(), {
                  locale: locale,
                })}
            </p>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <p className="mb-2 text-lg leading-6 hover:text-muted">
          <Link
            onClick={() => plausible('Post Title Link: Click')}
            href={data.url || '/' + data.profile?.username}
            className="text-text text-xl leading-5 font-semibold hover:text-blue"
          >
            {data.title}
          </Link>
        </p>
        {data.html && <PostDescription content={data.html} />}
        {data.description && <PostDescription content={data.description} />}
        {data.thumbnailUrl && (
          <div className="max-w-xs mx-auto">
            <PostImage
              alt={data.description || 'Beze jména'}
              src={data.thumbnailUrl}
              isThumbnail
            />
          </div>
        )}
      </div>
    </div>
  );
}

PostCard.Skeleton = function CardSkeleton() {
  return (
    <div
      className={`bg-white animate-in fade-in rounded-xl mb-4 mr-4 md:mb-6 md:mr-6`}
    >
      <div className="animate-pulse">
        <div className="flex flex-column pt-3 px-3 mb-2">
          <div className="w-12 h-12 bg-smoke rounded-full mr-2"></div>
          <div className="mt-1 flex-1">
            <div className="mb-1.5 w-8/12 text-text h-3.5 rounded-full bg-smoke"></div>
            <div className="h-3 w-1/2 rounded-full bg-smoke"></div>
          </div>
        </div>
        <div className="px-4 mt-3 pb-4">
          <div className="h-3.5 mb-2.5 w-10/12 rounded-full bg-smoke"></div>
          <div className="h-3.5 mb-2.5 w-11/12 rounded-full bg-smoke"></div>
          <div className="h-3.5 mb-2.5 w-8/12 rounded-full bg-smoke"></div>
          <div className="h-3.5 mb-2.5 w-9/12 rounded-full bg-smoke"></div>
          <div className="relative overflow-hidden mt-4 rounded-md w-full bg-background aspect-w-4 aspect-h-3"></div>
        </div>
      </div>
    </div>
  );
};
