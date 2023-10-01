'use client';
import Posts from './posts';
import { PostsFilterProvider } from './use-posts-filter';

export default function AnalyticsPostsPage() {
  /*   const allowedParams = [
    'kind',
    'course',
    'lang',
    'sentiment',
    'category',
    'profiling',
  ]; */
  return (
    <PostsFilterProvider>
      <div className="w-full">
        <Posts />
      </div>
    </PostsFilterProvider>
  );
}
