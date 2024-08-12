'use client';
import { Suspense } from 'react';
import Posts from './posts';
import { PostsFilterProvider } from './use-posts-filter';

export default function AnalyticsPostsPage() {
  return (
    <Suspense>
      <PostsFilterProvider>
        <div className="w-full">
          <Posts />
        </div>
      </PostsFilterProvider>
    </Suspense>
  );
}
