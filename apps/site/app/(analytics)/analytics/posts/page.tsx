'use client';
import Posts from './posts';
import { PostsFilterProvider } from './use-posts-filter';

export default function AnalyticsPostsPage() {
  return (
    <PostsFilterProvider>
      <div className="w-full">
        <Posts />
      </div>
    </PostsFilterProvider>
  );
}
