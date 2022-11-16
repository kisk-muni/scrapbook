'use client';
import { PostItemProps } from 'lib/hooks/use-portfolios-list';
import { parseISO, format } from 'date-fns';
import csLocale from 'date-fns/locale/cs';
import { Markup } from 'interweave';
import Link from 'next/link';
import { usePlausible } from 'next-plausible';
import Columned from 'react-columned';
import { use } from 'react';

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

function Skeleton() {
  return (
    <div
      className={`bg-white rounded-lg h-32 md:h-46 lg:h-64 mb-4 ml-4 md:mb-6 md:ml-6 break-inside ${shimmer}`}
    >
      <div className="flex flex-column p-3">
        <div className="w-12 h-12 bg-smoke rounded-full mr-2"></div>
        <div className="mt-1">
          <p className="mb-0 mt-0.5 text-text text-lg leading-5 font-bold hover:text-dark"></p>
          <p className="text-muted text-sm"></p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="mb-2 text-lg leading-6 hover:text-muted"></p>
        <p className="text-lg text-text leading-6"></p>
      </div>
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <Columned
      className="-ml-4 md:-ml-6 lg:-ml-8"
      columns={{ '768': 1, '1024': 2, '1280': 3, '1600': 4 }}
    >
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Columned>
  );
}

function Card(props: PostItemProps) {
  const description = props.description?.split('<a class="more-link"')[0];
  const plausible = usePlausible();
  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-column p-3">
        <div className="w-12 h-12 bg-smoke rounded-full mr-2"></div>
        <div className="mt-1">
          {(props.portfolios.title || props.portfolios.url) && (
            <p className="mb-0 mt-0.5 text-text text-lg leading-5 font-bold hover:text-dark">
              <Link
                onClick={() => plausible('Post Title Link: Click')}
                href={props.url}
              >
                {props.portfolios.title
                  ? props.portfolios.title
                  : props.portfolios.url}
              </Link>
            </p>
          )}
          <p className="text-muted text-sm">
            {format(parseISO(props.published_at), 'do MMMM yyyy', {
              locale: csLocale,
            })}
          </p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="mb-2 text-lg leading-6 hover:text-muted">
          <Link
            onClick={() => plausible('Post Title Link: Click')}
            href={props.url}
            className="text-blue underline"
          >
            {props.title}
          </Link>
        </p>
        <p className="text-lg text-text leading-6">
          <Markup content={description} />
        </p>
      </div>
    </div>
  );
}

// https://www.youtube.com/watch?v=zwQs4wXr9Bg&t=531s
const fetchMap = new Map<string, Promise<any>>();

function queryClient<QueryResult>(
  name: string,
  query: () => Promise<QueryResult>
): Promise<QueryResult> {
  if (!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }
  return fetchMap.get(name)!;
}

export function Posts() {
  const posts = use(
    queryClient(
      'posts',
      () =>
        fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/rest/v1/portfolio_posts?select=title,description,url,id,published_at,portfolios(title,url)&order=published_at.desc&apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        ).then((res) => res.json()) as Promise<PostItemProps[]>
    )
  );
  return (
    <Columned
      className="-ml-4 md:-ml-6 lg:-ml-8"
      columns={{ '768': 1, '1024': 2, '1280': 3, '1600': 4 }}
    >
      {posts?.map((item, i) => (
        <div
          className="overflow-hidden mb-4 ml-4 md:mb-6 md:ml-6 break-inside"
          key={i}
        >
          <Card {...item} />
        </div>
      ))}
    </Columned>
  );
}
