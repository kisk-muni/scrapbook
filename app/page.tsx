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
        <div className="w-12 h-12 bg-gray-200 rounded-full mr-2"></div>
        <div className="">
          {(props.portfolios.title || props.portfolios.url) && (
            <p className="mb-0 mt-0.5 text-gray-800 font-bold hover:text-gray-500">
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
          <p className="text-gray-500 text-sm">
            {format(parseISO(props.published_at), 'do MMMM yyyy', {
              locale: csLocale,
            })}
          </p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="mb-2 text-gray-800 font-semibold hover:text-gray-500">
          <Link
            onClick={() => plausible('Post Title Link: Click')}
            href={props.url}
          >
            {props.title}
          </Link>
        </p>
        <p className="">
          <Markup content={description.substring(0, 140)} />
        </p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="mx-auto mt-6 mb-8 max-w-7xl px-4 sm:mt-8 sm:mb-16 sm:px-6 md:mt-12 md:mb-20">
      <div className="text-center justify-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block text-amber-600 xl:inline">Portfolios</span>
        </h1>
        <p className="mt-3 text-base text-gray-500 mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl">
          See what KISK students do.
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
        className="-ml-4"
        columns={{ '768': 1, '1024': 2, '1280': 3, '1600': 4 }}
      >
        {data.map((item, i) => (
          <div className="overflow-hidden mb-4 ml-4 break-inside" key={i}>
            <Card {...item} />
          </div>
        ))}
      </Columned>
      <div className="items-centers flex mt-4 justify-center mb-10">
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
