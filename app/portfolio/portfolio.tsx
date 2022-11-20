'use client';
import { LinkIcon } from '@heroicons/react/20/solid';
import { format, parseISO } from 'date-fns';
import { Markup } from 'interweave';
import { polyfill } from 'interweave-ssr';
import csLocale from 'date-fns/locale/cs';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'lib/fetcher';

interface PostProps {
  id: string;
  title?: string | null;
  published_at?: string | null;
  url?: string | null;
  description?: string | null;
  thumbnail_url?: string | null;
}

interface PortfolioData {
  title?: string;
  image_url?: string;
  url?: string;
  feed_url?: string;
  id: string;
  portfolio_posts?: PostProps[];
}

const API = (feedUrl: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/rest/v1/portfolios?select=id,url,feed_url,image_url,title,portfolio_posts(title,id,url,description,thumbnail_url,published_at)&feed_url=eq.${feedUrl}&apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`;

interface CardProps {
  index?: number;
  data: PostProps;
  width?: number;
}

function Card(props: CardProps) {
  polyfill();
  const data = props.data;
  return (
    <div className="bg-white p-4 sm:p-6">
      {data?.published_at && (
        <p className="text-text text-lg font-bold mb-2">
          {format(parseISO(data?.published_at), 'do MMMM yyyy', {
            locale: csLocale,
          })}
        </p>
      )}
      {data?.title && data?.url && (
        <p className="mb-2 text-lg leading-6 hover:text-muted">
          <Link href={data?.url} className="text-blue underline">
            {data?.title}
          </Link>
        </p>
      )}
      {data.description && (
        <p className="text-lg text-text leading-6">
          <Markup
            content={data?.description?.split('<a class="more-link"')[0]}
          />
        </p>
      )}
      {data.thumbnail_url && (
        <div className="relative overflow-hidden mt-4 rounded-md w-full bg-background h-48 md:h-56 lg:h-60 xl:h-64">
          <Image
            alt={data.title}
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
  );
}

export function PortfolioSkeleton() {
  return (
    <div className="flex items-center animate-pulse">
      <div className="rounded-full w-32 h-32 bg-smoke mr-2 sm:mr-4"></div>
      <div>
        <div className="h-7 mt-3 mb-3 w-56 rounded-full bg-smoke"></div>
        <div className="flex gap-2">
          <div className="h-5 w-20 mt-0.5 mb-2.5 rounded-full bg-smoke"></div>
        </div>
      </div>
    </div>
  );
}

// async function getData(feedUrl: string) {
//   const res = await fetch(API(feedUrl));
//   return res.json().then((data) => data[0]) as unknown as PortfolioData;
// }

export function Portfolio(props: { feedUrl?: string }) {
  if (!props.feedUrl) throw new Error('Feed URL not provided.');
  const { data, error } = useSWR<PortfolioData[]>(API(props.feedUrl), fetcher);
  if (error || (data && !data.length)) throw new Error('No portfolio found.');
  if (!data) return <PortfolioSkeleton />;
  const portfolio = data[0];
  return (
    <div>
      <div className="flex items-center">
        {portfolio.image_url ? (
          <Image
            className="rounded-full border border-smoke w-32 h-32 mr-2 sm:mr-4"
            alt={portfolio.title}
            width={72}
            height={72}
            src={
              'https://res.cloudinary.com/demo/image/fetch/' +
              portfolio.image_url
            }
          />
        ) : (
          <div className="rounded-full w-32 h-32 bg-smoke mr-2 sm:mr-4"></div>
        )}
        <div>
          <h1 className="text-2xl mb-2 tracking-tight text-text sm:text-3xl md:text-3xl">
            <span className="block xl:inline font-extrabold">
              {portfolio.title}
            </span>
          </h1>
          <div className="flex gap-2">
            {portfolio.url && (
              <Link
                href={portfolio.url}
                className="flex items-center text-sm bg-blue hover:opacity-90 text-background rounded-full px-2 py-0.5"
              >
                <LinkIcon className="w-4 h-4 mr-0.5 -ml-px -mt-px" /> Portfolio
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-12 overflow-hidden rounded-xl grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {portfolio.portfolio_posts &&
          portfolio.portfolio_posts?.map((item, i) => (
            <Card key={i} data={item} index={i + 1} />
          ))}
      </div>
    </div>
  );
}
