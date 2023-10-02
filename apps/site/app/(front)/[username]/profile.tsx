'use client';
import { LinkIcon } from '@heroicons/react/20/solid';
import { format, parseISO } from 'date-fns';
import { polyfill } from 'interweave-ssr';
import csLocale from 'date-fns/locale/cs';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'lib/fetcher';
import { PostImage } from 'components/post-image';
import { PostDescription } from 'components/post-description';
import { Avatar } from 'components/avatar';

interface PortfolioPostData {
  id: string;
  title?: string | null;
  published_at?: string | null;
  url?: string | null;
  description?: string | null;
  thumbnail_url?: string | null;
}

interface PortfolioPageData {
  id: string;
  title?: string | null;
  published_at?: string | null;
  url?: string | null;
  description?: string | null;
  thumbnail_url?: string | null;
}

type PostProps = PortfolioPostData;

interface PortfolioData {
  id: string;
  url: string;
  portfolio_posts?: PostProps[];
  portfolio_pages?: PortfolioPageData[];
  image_url?: string;
}

interface ProfileData {
  username: string;
  full_name?: string;
  id: string;
  portfolios?: PortfolioData[];
}

const API = (userName: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/rest/v1/profiles?select=id,username,full_name,portfolios(url,id,image_url,portfolio_posts(title,id,url,description,thumbnail_url,published_at))&username=eq.${userName}&apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`;

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
      {data.published_at && (
        <p className="text-muted font-bold mb-2">
          {format(parseISO(data?.published_at), 'do MMMM yyyy', {
            locale: csLocale,
          })}
        </p>
      )}
      {data.title && data?.url && (
        <p className="mb-3 text-xl leading-5 font-semibold">
          <Link href={data?.url} className="text-text hover:text-blue">
            {data?.title}
          </Link>
        </p>
      )}
      {data.description && (
        <p className="text-lg text-text leading-6">
          <PostDescription content={data.description} />
        </p>
      )}
      {data.thumbnail_url && (
        <PostImage alt={data.title} src={data.thumbnail_url} isThumbnail />
      )}
    </div>
  );
}

export function PortfolioSkeleton() {
  return (
    <div className="flex items-center animate-pulse">
      <div className="rounded-full w-32 h-32 bg-smoke grow-0 shrink-0 mr-2 sm:mr-4"></div>
      <div>
        <div className="h-7 mt-3 mb-3 w-56 rounded-full bg-smoke"></div>
        <div className="flex gap-2">
          <div className="h-5 w-20 mt-0.5 mb-2.5 rounded-full bg-smoke"></div>
        </div>
      </div>
    </div>
  );
}

export function Profile(props: { userName?: string }) {
  if (!props.userName) throw new Error('Username not provided.');
  const { data, error } = useSWR<ProfileData[]>(API(props.userName), fetcher);
  if (error || (data && !data.length)) throw new Error('No profile found.');
  if (!data) return <PortfolioSkeleton />;
  const profile = data[0];

  const portfolios = profile.portfolios || [];
  // merge portfolio_posts from all portfolios in data array to a single array
  const portfolio_posts = portfolios
    .reduce(
      (acc, curr) => [...acc, ...(curr.portfolio_posts || [])],
      [] as PortfolioPostData[]
    )
    .sort((a, b) => {
      if (!a.published_at) return 1;
      if (!b.published_at) return -1;
      return (
        parseISO(b.published_at).getTime() - parseISO(a.published_at).getTime()
      );
    });

  return (
    <div>
      <div className="flex items-center">
        <Avatar
          imageUrl={
            profile?.portfolios?.length ? profile.portfolios[0].image_url : ''
          }
          className="rounded-full border border-smoke w-32 h-32 mr-2 text-3xl sm:mr-4"
          size={72}
          name={profile.full_name || profile.username}
        />
        <div>
          <h1 className="text-2xl mb-2 tracking-tight text-text sm:text-3xl md:text-3xl">
            <span className="block xl:inline font-extrabold">
              {profile.full_name}
            </span>
          </h1>
          <div className="flex gap-2">
            {profile?.portfolios && profile.portfolios.length != 0 && (
              <Link
                target="_blank"
                href={profile?.portfolios[0].url}
                className="flex items-center text-sm bg-blue hover:opacity-90 text-background rounded-full px-2 py-0.5"
              >
                <LinkIcon className="w-4 h-4 mr-0.5 -ml-px -mt-px" /> Portfolio
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-12 overflow-hidden rounded-xl grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {profile?.portfolios?.length != 0 &&
          portfolio_posts &&
          portfolio_posts?.map((item, i) => (
            <Card key={i} data={item} index={i + 1} />
          ))}
      </div>
    </div>
  );
}
