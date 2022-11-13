'use client';
import Button from 'components/button';
import usePortfoliosList, {
  PostItemProps,
} from 'lib/hooks/use-portfolios-list';
import { parseISO, format } from 'date-fns';
import csLocale from 'date-fns/locale/cs';
import { Markup } from 'interweave';
import Link from 'next/link';

function Card(props: PostItemProps) {
  const description = props.description.split('<a class="more-link"')[0];
  return (
    <div className="bg-white p-4 rounded-lg">
      <p className="mb-2 text-gray-500 text-sm">
        {format(parseISO(props.published_at), 'do MMMM yyyy', {
          locale: csLocale,
        })}
      </p>
      <p className="mb-2 text-gray-800 font-bold hover:text-gray-500">
        <Link href={props.url}>{props.title}</Link>
      </p>
      <p className="">
        <Markup content={description} />
      </p>
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
  return (
    <div>
      <Hero />
      <div className="columns-2 gap-4 md:columns-3 xl:columns-4">
        {data.map((item, i) => (
          <div className="overflow-hidden mb-4" key={i}>
            <Card {...item} />
          </div>
        ))}
      </div>
      <div className="items-centers flex mt-4 justify-center mb-10">
        <Button
          isDisabled={isLoadingMore || isReachingEnd}
          onPress={() => setSize(size + 1)}
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
