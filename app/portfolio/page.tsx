import { Suspense } from 'react';
import { Portfolio, PortfolioSkeleton } from './portfolio';

export default async function PortfolioPage(params) {
  return (
    <div className="mx-auto sm:max-w-8xl mt-6 mb-8 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-20">
      <Suspense fallback={<PortfolioSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <Portfolio url={params?.searchParams?.feed as unknown as string} />
      </Suspense>
    </div>
  );
}
