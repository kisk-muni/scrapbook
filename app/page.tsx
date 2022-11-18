'use client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Posts, SkeletonPosts } from './posts';

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
  return (
    <div>
      <Hero />
      <ErrorBoundary fallback={<div>Příspěvky se nepodařilo načíst.</div>}>
        <Suspense fallback={<SkeletonPosts />}>
          <Posts />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
