'use client';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'lib/fetcher';
import { Avatar } from 'components/avatar';

interface ProfileData {
  username: string;
  full_name?: string;
  portfolios?: {
    image_url: string;
  }[];
}

const API = `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/rest/v1/profiles?select=username,full_name,portfolios(image_url)&order=full_name.asc.nullslast&apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`;

export function ProfileSkeleton() {
  return (
    <div className="mb-3 md:mb-6 flex sm:flex-col justify-start sm:justify-center items-center animate-pulse">
      <div className="rounded-full w-16 md:w-24 lg:w-28 h-16 md:h-24 lg:h-28 shrink-0 bg-smoke mb-0 mr-4 sm:mr-0 sm:mb-3"></div>
      <div>
        <div className="h-4 w-32 rounded-full bg-smoke"></div>
      </div>
    </div>
  );
}

function Profile(props: ProfileData) {
  return (
    <div className="mb-3 md:mb-6">
      <Link
        href={'/' + props.username}
        className="flex sm:flex-col justify-start sm:justify-center items-center"
      >
        <Avatar
          size={192}
          className="rounded-full shadow-md border text-2xl border-smoke w-16 md:w-24 lg:w-28 h-16 md:h-24 lg:h-28 mb-0 mr-4 sm:mr-0 sm:mb-3"
          name={props?.full_name || props.username || ''}
          imageUrl={
            props.portfolios?.length
              ? props?.portfolios[0].image_url
              : undefined
          }
        />
        <span className="text-lg font-bold tracking-tight text-center max-w-xs text-text leading-5">
          {props.full_name || props.username || ''}
        </span>
      </Link>
    </div>
  );
}

export function ProfileList() {
  const { data, error } = useSWR<ProfileData[]>(API, fetcher);
  if (error) throw new Error('No portfolio found.');
  return (
    <div className="sm:flex sm:flex-row sm:justify-center sm:align-flex-start sm:flex-wrap sm:basis-auto gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 2xl:grid-cols-8">
      {data
        ? data
            .filter((i) => i.username !== null)
            ?.map((item, i) => <Profile key={i} {...item} />)
        : [...Array(30).keys()].map((_item, i) => <ProfileSkeleton key={i} />)}
    </div>
  );
}
