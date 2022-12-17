'use client';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'lib/fetcher';
import { cloudinaryImageFetch } from 'lib/cloudinary';
import { Avatar } from 'components/avatar';

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
    <div className="mb-3 md:mb-6 flex sm:flex-col justify-start sm:justify-center items-center animate-pulse">
      <div className="rounded-full w-16 md:w-24 lg:w-28 h-16 md:h-24 lg:h-28 shrink-0 bg-smoke mb-0 mr-4 sm:mr-0 sm:mb-3"></div>
      <div>
        <div className="h-4 w-32 rounded-full bg-smoke"></div>
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
    <div className="mb-3 md:mb-6">
      <Link
        href={'/portfolio?feed=' + props.feed_url}
        className="flex sm:flex-col justify-start sm:justify-center items-center"
      >
        <Avatar
          size={192}
          className="rounded-full shadow-md border border-smoke w-16 md:w-24 lg:w-28 h-16 md:h-24 lg:h-28 mb-0 mr-4 sm:mr-0 sm:mb-3"
          name={props.title}
          imageUrl={props.image_url}
        />
        <span className="text-lg font-bold tracking-tight text-center max-w-xs text-text leading-5">
          {props.title
            ? props.title
            : props.url
            ? props.url.replace('https://', '')
            : props.feed_url
                .replace('https://', '')
                .replace(/\/feed|rss|.xml/g, '')}
        </span>
      </Link>
    </div>
  );
}

export function PortfoliosList() {
  const { data, error } = useSWR<PortfolioData[]>(API, fetcher);
  if (error) throw new Error('No portfolio found.');
  return (
    <div className="sm:flex sm:flex-row sm:justify-center sm:align-flex-start sm:flex-wrap sm:basis-auto gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 2xl:grid-cols-8">
      {data
        ? data?.map((item, i) => <Portfolio key={i} {...item} />)
        : [...Array(30).keys()].map((_item, i) => (
            <PortfolioSkeleton key={i} />
          ))}
    </div>
  );
}
