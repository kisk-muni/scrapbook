'use client';
import { useSearchParams } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import { Portfolio } from './portfolio';

export default function PortfolioPage() {
  const searchParams = useSearchParams();
  return (
    <div className="mx-auto sm:max-w-8xl mt-6 mb-8 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-20">
      <ErrorBoundary fallback={<div>Portfolio se nepodařilo načíst.</div>}>
        <Portfolio feedUrl={searchParams.get('feed')} />
      </ErrorBoundary>
    </div>
  );
}
