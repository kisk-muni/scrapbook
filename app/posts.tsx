'use client';
import { parseISO, format } from 'date-fns';
import csLocale from 'date-fns/locale/cs';
import { Markup } from 'interweave';
import { polyfill } from 'interweave-ssr';
import Link from 'next/link';
import { usePlausible } from 'next-plausible';
import { Masonry } from 'masonic';
import { Fragment, useEffect, useRef } from 'react';
import useApiInfinite from 'lib/use-api-infinite';
import useOnScreen from 'lib/hooks/use-on-screen';
import Image from 'next/image';

const limit = 20;

interface PostItemProps {
  skeleton?: boolean;
  id?: string;
  title?: string | null;
  published_at?: string | null;
  url?: string | null;
  description?: string | null;
  thumbnail_url?: string | null;
  portfolios?: {
    title: string | null;
    url: string | null;
    image_url: string | null;
  };
}

function usePortfoliosList() {
  return useApiInfinite<PostItemProps>(
    `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/rest/v1/portfolio_posts?select=title,description,url,id,published_at,thumbnail_url,portfolios(title,url,image_url)&order=published_at.desc&apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    limit
  );
}

function LoadingIcon() {
  return (
    <div className="bg-white dark:bg-smoke w-10 h-10 ring-1 ring-snow dark:ring-slate shadow-lg rounded-full flex items-center justify-center">
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
          stroke-width="4"
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

function Skeleton() {
  return (
    <div
      className={`bg-white animate-in fade-in rounded-lg mb-4 mr-4 md:mb-6 md:mr-6`}
    >
      <div className="animate-pulse">
        <div className="flex flex-column p-3">
          <div className="w-12 h-12 bg-smoke rounded-full mr-2"></div>
          <div className="mt-1 flex-1">
            <div className="mb-1.5 mt-0.5 w-3/4 text-text h-4 rounded-full bg-smoke"></div>
            <div className="h-3 w-1/2 rounded-full bg-smoke"></div>
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="h-3.5 mt-0.5 mb-2.5 w-10/12 rounded-full bg-smoke"></div>
          <div className="h-3.5 mt-0.5 mb-2.5 w-11/12 rounded-full bg-smoke"></div>
          <div className="h-3.5 mt-0.5 mb-2.5 w-8/12 rounded-full bg-smoke"></div>
          <div className="h-3.5 mt-0.5 mb-2.5 w-9/12 rounded-full bg-smoke"></div>
          <div className="relative overflow-hidden mt-4 rounded-md w-full bg-background h-48 md:h-56 lg:h-60 xl:h-64"></div>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  index: number;
  data: PostItemProps;
  width: number;
}

function Card({ data }: CardProps) {
  const description = data.description?.split('<a class="more-link"')[0];
  const plausible = usePlausible();
  if (data.skeleton) return <Skeleton />;
  return (
    <div className="bg-white rounded-lg mb-4 mr-4 md:mb-6 md:mr-6">
      <div className="flex flex-column p-3">
        {data.portfolios.image_url ? (
          <Image
            className="rounded-full w-12 h-12 mr-2"
            alt={data.portfolios.title}
            width={48}
            height={48}
            src={
              'https://res.cloudinary.com/demo/image/fetch/' +
              data.portfolios.image_url
            }
          />
        ) : (
          <div className="w-12 h-12 bg-smoke rounded-full mr-2"></div>
        )}
        <div className="mt-1">
          {(data.portfolios.title || data.portfolios.url) && (
            <p className="mb-0 mt-0.5 text-text text-lg leading-5 font-bold hover:text-dark">
              <Link
                onClick={() => plausible('Post Title Link: Click')}
                href={data.url}
              >
                {data.portfolios.title
                  ? data.portfolios.title
                  : data.portfolios.url}
              </Link>
            </p>
          )}
          <p className="text-muted text-sm">
            {format(parseISO(data.published_at), 'do MMMM yyyy', {
              locale: csLocale,
            })}
          </p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="mb-2 text-lg leading-6 hover:text-muted">
          <Link
            onClick={() => plausible('Post Title Link: Click')}
            href={data.url}
            className="text-blue underline"
          >
            {data.title}
          </Link>
        </p>
        <p className="text-lg text-text leading-6">
          <Markup content={description} />
        </p>
        {data.thumbnail_url && (
          <div className="relative overflow-hidden mt-4 rounded-md w-full bg-background h-48 md:h-56 lg:h-60 xl:h-64">
            <Image
              alt={data.portfolios.title}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              className="object-contain"
              src={
                'https://res.cloudinary.com/demo/image/fetch/' +
                data.thumbnail_url
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

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
      <div
        ref={ref}
        className="items-centers flex justify-center mb-6 md:mb-8 lg:mb-10"
      >
        {isLoadingMore ? (
          <LoadingIcon />
        ) : isReachingEnd ? (
          'Žádné další příspěvky'
        ) : (
          ''
        )}
      </div>
    </Fragment>
  );
}
