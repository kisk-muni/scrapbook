'use client';
import { parseISO, formatRelative } from 'date-fns';
import csLocale from 'date-fns/locale/cs';
import { polyfill } from 'interweave-ssr';
import Link from 'next/link';
import { usePlausible } from 'next-plausible';
import { Masonry } from 'masonic';
import { Fragment, useEffect, useRef } from 'react';
import useApiInfinite from 'lib/use-api-infinite';
import useOnScreen from 'lib/hooks/use-on-screen';
import { PostImage } from 'components/post-image';
import { PostDescription } from 'components/post-description';
import { Avatar } from 'components/avatar';
import supabase from 'lib/supabase';
import Image from 'next/image';

const formatRelativeLocale = {
  lastWeek: "eeee 'v' p",
  yesterday: "'včera v' p",
  today: "'dnes v' p",
  tomorrow: "'zítra v' p",
  nextWeek: 'do MMMM yyyy',
  other: 'do MMMM yyyy',
};

const emojis = {
  scrappy:
    'https://cdn.discordapp.com/emojis/1063939454848467005.webp?size=64&quality=lossless',
  thank_you:
    'https://cdn.discordapp.com/emojis/1052364641143111760.webp?size=64&quality=lossless',
  mooc: 'https://cdn.discordapp.com/emojis/1046821807417720902.webp?size=64&quality=lossless',
  double_diamond:
    'https://cdn.discordapp.com/emojis/1046792628353650688.webp?size=64&quality=lossless',
  plechacek:
    'https://cdn.discordapp.com/emojis/1046783925097336922.webp?size=64&quality=lossless',
  upvote:
    'https://cdn.discordapp.com/emojis/1046769888078876773.webp?size=64&quality=lossless',
  this_tbh:
    'https://cdn.discordapp.com/emojis/1046565288478507008.webp?size=64&quality=lossless',
  okk: 'https://cdn.discordapp.com/emojis/1044281424250945647.webp?size=64&quality=lossless',
  zluta_bible:
    'https://cdn.discordapp.com/emojis/898997662383239229.webp?size=64&quality=lossless',
  KISK_logo:
    'https://cdn.discordapp.com/emojis/898941770459648000.webp?size=64&quality=lossless',
};

const locale = {
  ...csLocale,
  formatRelative: (token) => formatRelativeLocale[token],
};

const limit = 30;

interface PostItemProps {
  skeleton?: boolean;
  id?: string;
  title?: string | null;
  published_at?: string | null;
  url?: string | null;
  description?: string | null;
  thumbnail_url?: string | null;
  portfolios?: {
    id: string;
    title: string | null;
    url: string | null;
    image_url: string | null;
    feed_url: string | null;
    profiles?: {
      username: string;
      full_name: string;
    };
  };
  discord_message_reactions: {
    emoji_name: string;
  }[];
}

function usePortfoliosList() {
  return useApiInfinite(
    supabase
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
          url,
          image_url,
          profiles(
            username,
            full_name
          )
        ),
        discord_message_reactions(
          emoji_name
        )
      `
      )
      .order('published_at', { ascending: false }),
    limit
  );
}

function LoadingIcon() {
  return (
    <div className="bg-white w-10 h-10 ring-1 ring-snow shadow-lg rounded-full flex items-center justify-center">
      <svg
        className="animate-spin w-6 h-6 text-orange h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}

interface CardProps {
  index: number;
  data: PostItemProps;
  width: number;
}

function Card({ data }: CardProps) {
  const plausible = usePlausible();
  if (data.skeleton) return <Card.Skeleton />;
  const reactions: { [key: string]: number } =
    data.discord_message_reactions.reduce((counts, reaction) => {
      const { emoji_name } = reaction;
      //if (emoji_name.length > 1) return counts;
      counts[emoji_name] = (counts[emoji_name] || 0) + 1;
      //counts['total'] = (counts['total'] || 0) + 1;
      return counts;
    }, {});
  return (
    <div className="bg-white rounded-lg mb-4 mr-4 md:mb-6 md:mr-6">
      <Link
        className="cursor-pointer"
        onClick={() => plausible('Portfolio Link: Click')}
        href={'/' + data.portfolios?.profiles?.username}
      >
        <div className="flex flex-column pt-3 px-3 mb-2">
          <Avatar
            className="rounded-full w-12 h-12 mr-2"
            name={
              data.portfolios?.profiles?.full_name ||
              data.portfolios?.title ||
              'Beze jména'
            }
            size={48}
            imageUrl={data.portfolios?.image_url}
          />
          <div className="mt-1">
            {(data.portfolios?.profiles?.full_name || data.portfolios?.url) && (
              <p className="mb-0 mt-0.5 text-text text-base leading-5 font-bold hover:text-dark">
                {data.portfolios?.profiles?.full_name
                  ? data.portfolios?.profiles?.full_name
                  : data.portfolios.title || 'Beze jména'}
              </p>
            )}
            <p className="text-muted text-base leading-4">
              {data?.published_at &&
                formatRelative(parseISO(data?.published_at), new Date(), {
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
            href={data.url || '/' + data.portfolios?.profiles?.username}
            className="text-text text-xl leading-5 font-semibold hover:text-blue"
          >
            {data.title}
          </Link>
        </p>
        {data.description && <PostDescription content={data.description} />}
        {data.thumbnail_url && (
          <PostImage
            alt={data?.portfolios?.profiles?.full_name || 'Beze jména'}
            src={data.thumbnail_url}
            isThumbnail
          />
        )}
        <div className="flex mt-3 items-center">
          {Object.keys(reactions).map((key) => {
            return (
              <div
                className="pointer-events-auto flex pt-px items-center justify-center h-9 px-3 mr-2 -ml-1 rounded-full ring-1 ring-inset transition duration-200 ease-in-out bg-yellow ring-yellow"
                key={key}
              >
                <span className="text-sm -mt-px mr-1 text-slate">
                  {reactions[key]}
                </span>{' '}
                {Object.keys(emojis).includes(key) ? (
                  <Image src={emojis[key]} width={19} height={19} alt={key} />
                ) : (
                  <span className="text-xl -mb-px">{key}</span>
                )}
              </div>
            );
          })}{' '}
        </div>
      </div>
    </div>
  );
}

Card.Skeleton = function CardSkeleton() {
  return (
    <div
      className={`bg-white animate-in fade-in rounded-lg mb-4 mr-4 md:mb-6 md:mr-6`}
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

// https://www.youtube.com/watch?v=zwQs4wXr9Bg&t=531s
export function Posts() {
  const { data, size, setSize, isLoadingMore, isRefreshing, isReachingEnd } =
    usePortfoliosList();
  const plausible = usePlausible();
  const ref = useRef();

  const isVisible = useOnScreen(ref);
  polyfill();
  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing) {
      setSize(size + 1);
      plausible('Load More');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, isRefreshing]);

  return (
    <Fragment>
      <div className="flex -mr-4 md:-mr-6">
        <Masonry
          items={
            !data.length
              ? Array.from(Array(8), () => ({ skeleton: true }))
              : data
          }
          render={Card}
          columnWidth={324}
          maxColumnCount={4}
        />
      </div>
      <div ref={ref} className="items-centers flex justify-center mb-20 mt-2">
        {isLoadingMore ? (
          <div>
            <LoadingIcon />
          </div>
        ) : isReachingEnd ? (
          'Žádné další příspěvky'
        ) : (
          ''
        )}
      </div>
    </Fragment>
  );
}
