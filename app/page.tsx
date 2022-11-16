'use client';
import Button from 'components/button';
import usePortfoliosList, {
  PostItemProps,
} from 'lib/hooks/use-portfolios-list';
import { parseISO, formatRelative } from 'date-fns';
import csLocale from 'date-fns/locale/cs';
import { Markup } from 'interweave';
import Link from 'next/link';
import Columned from 'react-columned';
import { usePlausible } from 'next-plausible';
import Image from 'next/image';

const formatRelativeLocale = {
  lastWeek: "do MM yyy'",
  yesterday: "'včera v'",
  today: "'dnes v'",
  tomorrow: "'zítra v'",
  nextWeek: 'do MM yyyy',
  other: 'do MM yyyy',
};

const locale = {
  ...csLocale,
  formatRelative: (token) => formatRelativeLocale[token],
};

function Card(props: PostItemProps) {
  const description = props.description?.split('<a class="more-link"')[0];
  const plausible = usePlausible();
  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-column p-3">
        {props.portfolios.image_url ? (
          <Image
            className="rounded-full w-12 h-12 mr-2"
            alt={props.portfolios.title}
            width={48}
            height={48}
            src={
              'https://res.cloudinary.com/demo/image/fetch/' +
              props.portfolios.image_url
            }
          />
        ) : (
          <div className="w-12 h-12 bg-smoke rounded-full mr-2"></div>
        )}
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
            {formatRelative(parseISO(props.published_at), new Date(), {
              locale,
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
        {props.thumbnail_url && (
          <div className="relative overflow-hidden mt-4 rounded-md w-full bg-background h-48 md:h-56 lg:h-60 xl:h-64">
            <Image
              alt={props.portfolios.title}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              className="object-contain"
              src={
                'https://res.cloudinary.com/demo/image/fetch/' +
                props.thumbnail_url
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="mx-auto mt-6 mb-8 px-4 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-20">
      <div className="text-center justify-center">
        <h1 className="text-5xl mb-3 tracking-tight text-transparent bg-gradient-header from-yellow to-orange bg-clip-text font-header md:text-6xl lg:text-6xl xl:text-7xl">
          <span className="block xl:inline">KISKový Scrapbook</span>
        </h1>
        <p className="mt-0 text-lg md:text-xl lg:text-2xl text-text mx-auto">
          Co se právě učíme a na čem každý den pracujeme.
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { data, size, setSize, isLoadingMore, isReachingEnd } =
    usePortfoliosList();
  const plausible = usePlausible();
  const handleLoadMore = () => {
    setSize(size + 1);
    plausible('Load More');
  };

  return (
    <div>
      <Hero />
      <Columned
        className="-ml-4 md:-ml-6 lg:-ml-8"
        columns={{ '768': 1, '1024': 2, '1280': 3, '1600': 4 }}
      >
        {data.map((item, i) => (
          <div
            className="overflow-hidden mb-4 ml-4 md:mb-6 md:ml-6 break-inside"
            key={i}
          >
            <Card {...item} />
          </div>
        ))}
      </Columned>
      <div className="items-centers flex justify-center mb-6 md:mb-8 lg:mb-10">
        <Button
          isDisabled={isLoadingMore || isReachingEnd}
          onPress={handleLoadMore}
        >
          {isLoadingMore
            ? 'Načítání...'
            : isReachingEnd
            ? 'Žádné další příspěvky'
            : 'Načíst další'}
        </Button>
      </div>
    </div>
  );
}
