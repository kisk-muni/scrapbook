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
        <div className="mt-1">
          {(props.portfolios.title || props.portfolios.url) && (
            <p className="mb-0 mt-0.5 text-gray-800 text-lg leading-5 font-bold hover:text-gray-500">
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
        <p className="mb-2 text-gray-800 leading-6 font-semibold text-lg hover:text-gray-500">
          <Link
            onClick={() => plausible('Post Title Link: Click')}
            href={props.url}
          >
            {props.title}
          </Link>
        </p>
        <p className="text-lg leading-6">
          <Markup content={description.substring(0, 140)} />
        </p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="mx-auto mt-6 mb-8 px-4 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-20">
      <div className="text-center justify-center">
        <h1 className="text-4xl mb-0 tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">KISKový Scrapbook</span>
        </h1>
        <p className="mt-0 text-2xl text-gray-900 mx-auto">
          Co se právě učíme a na čem každý den pracujeme.
        </p>
      </div>
      <style jsx>{`
        h1 {
          color: #ff5b00;
          font-family: 'Shrikhand';
          margin: 0;
          font-size: 64px;
          line-height: 1;
          padding: 16px;
          background-image: radial-gradient(
            ellipse farthest-corner at top left,
            #f7ff00,
            #ff5b00
          );
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
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
        className="-ml-6"
        columns={{ '768': 1, '1024': 2, '1280': 3, '1600': 4 }}
      >
        {data.map((item, i) => (
          <div className="overflow-hidden mb-6 ml-6 break-inside" key={i}>
            <Card {...item} />
          </div>
        ))}
      </Columned>
      <div className="items-centers flex mt-6 justify-center mb-10">
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
