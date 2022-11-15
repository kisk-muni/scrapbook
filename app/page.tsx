'use client';
import Button from 'components/button';
import usePortfoliosList, {
  PostItemProps,
} from 'lib/hooks/use-portfolios-list';
import { parseISO, format } from 'date-fns';
import csLocale from 'date-fns/locale/cs';
import { Markup } from 'interweave';
import Link from 'next/link';
import Columned from 'react-columned';
import { usePlausible } from 'next-plausible';

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

function Hero() {
  return (
    <div className="mx-auto mt-6 mb-8 px-4 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-20">
      <div className="text-center justify-center">
        <h1 className="text-4xl mb-3 tracking-tight text-transparent bg-gradient-header from-yellow to-orange bg-clip-text font-header sm:text-5xl md:text-6xl">
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
