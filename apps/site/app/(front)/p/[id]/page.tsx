import { Suspense } from 'react';
import { Post } from './post';

function PortfolioSkeleton() {
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
export default function ProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto sm:max-w-8xl mt-6 mb-8 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-20">
      <Suspense fallback={<PortfolioSkeleton />}>
        <Post id={id} />
      </Suspense>
    </div>
  );
}
