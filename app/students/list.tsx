'use client';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'lib/fetcher';

interface PortfolioData {
  title?: string;
  image_url?: string;
  url?: string;
  feed_url?: string;
  id: string;
}

const API = `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/rest/v1/portfolios?select=id,url,feed_url,image_url,title&order=image_url.nullslast,title.desc.nullslast&apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`;

export function PortfolioSkeleton() {
  return (
    <div className="mr-4 mb-6 flex items-center animate-pulse">
      <div className="rounded-full w-12 h-12 bg-smoke mr-2 sm:mr-3"></div>
      <div>
        <div className="h-4 w-48 rounded-full bg-smoke"></div>
      </div>
    </div>
  );
}

// async function getData(feedUrl: string) {
//   const res = await fetch(API(feedUrl));
//   return res.json().then((data) => data[0]) as unknown as PortfolioData;
// }

function Portfolio(props: PortfolioData) {
  return (
    <div className="mr-4 mb-6 ">
      <Link
        href={'/portfolio?feed=' + props.feed_url}
        className="flex items-center"
      >
        {props.image_url ? (
          <Image
            className="rounded-full shadow-md border border-smoke w-12 h-12 mr-2 sm:mr-3"
            alt={props.title}
            width={48}
            height={48}
            src={
              'https://res.cloudinary.com/demo/image/fetch/' + props.image_url
            }
          />
        ) : (
          <div className="rounded-full w-12 shrink-0 h-12 bg-smoke mr-2 sm:mr-3"></div>
        )}
        <h1 className="text-lg font-bold tracking-tight text-text leading-5">
          {props.title
            ? props.title
            : props.url
            ? props.url.replace('https://', '')
            : props.feed_url
                .replace('https://', '')
                .replace(/\/feed|rss|.xml/g, '')}
        </h1>
      </Link>
    </div>
  );
}

export function PortfoliosList() {
  const { data, error } = useSWR<PortfolioData[]>(API, fetcher);
  if (error) throw new Error('No portfolio found.');
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data
        ? data?.map((item, i) => <Portfolio key={i} {...item} />)
        : [...Array(30).keys()].map((_item, i) => (
            <PortfolioSkeleton key={i} />
          ))}
    </div>
  );
}
