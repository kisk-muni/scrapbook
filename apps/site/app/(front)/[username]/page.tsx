import { Suspense } from 'react';
import { ProfileHeader } from './profile-header';
import { ProfilePosts } from './profile-posts';
import { ProfileHeatmap } from './profile-heatmap';
import classNames from 'classnames';

function PortfolioSkeleton() {
  return (
    <div className="flex items-center animate-pulse">
      <div className="rounded-full w-32 h-32 bg-smoke grow-0 shrink-0 mr-2 sm:mr-4"></div>
      <div className="mr-14">
        <div className="h-7 mt-3 mb-3 w-56 rounded-full bg-smoke"></div>
        <div className="flex gap-2">
          <div className="h-5 w-20 mt-0.5 mb-2.5 rounded-full bg-smoke"></div>
        </div>
      </div>
    </div>
  );
}

function HeatmapSkeleton() {
  return (
    <div className="flex flex-col justify-center animate-pulse">
      <div className="h-4 mt-3 mb-3 w-48 rounded-full bg-smoke"></div>
      <div className="flex h-8 mt-6 space-x-1 items-center">
        {Array.from({ length: 24 }).map((_, i) => {
          return (
            <div
              key={i}
              className={classNames('relative h-4 w-4 rounded-md bg-smoke', {
                'h-6 w-6': i === 23,
              })}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
export default function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  return (
    <div className="mx-auto sm:max-w-8xl mt-6 mb-8 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-20">
      <div>
        <div className="flex">
          <Suspense fallback={<PortfolioSkeleton />}>
            <ProfileHeader userName={username} />
          </Suspense>
          <Suspense fallback={<HeatmapSkeleton />}>
            <ProfileHeatmap userName={username} />
          </Suspense>
        </div>
        <Suspense fallback={<div></div>}>
          <ProfilePosts userName={username} />
        </Suspense>
      </div>
    </div>
  );
}
