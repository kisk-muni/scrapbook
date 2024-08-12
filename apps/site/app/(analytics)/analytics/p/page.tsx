'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function PagePage() {
  const searchParams = useSearchParams();
  return (
    <Suspense>
      <div className="mx-auto sm:max-w-8xl mt-6 mb-8 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-20">
        {searchParams?.get('url')}
      </div>
    </Suspense>
  );
}
