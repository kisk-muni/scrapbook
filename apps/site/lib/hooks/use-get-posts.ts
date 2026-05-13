'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import getPosts, { UniversalPost } from 'lib/actions/get-posts';
import { PostWithProfiles } from 'db/schema';

const FETCH_POSTS_LIMIT = 30;

export default function useGetPosts(initialData: UniversalPost[]) {
  return useInfiniteQuery<UniversalPost[]>({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getPosts({ pageParam }),
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
    initialPageParam: 0,
    getNextPageParam(lastPage, allPages) {
      // Return the next page offset (page count * limit)
      return allPages.length * FETCH_POSTS_LIMIT;
    },
    refetchOnWindowFocus: true,
    staleTime: Infinity,
  });
}
