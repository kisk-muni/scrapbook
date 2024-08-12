'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import getPosts, { UniversalPost } from 'lib/actions/get-posts';
import { PostWithProfiles } from 'db/schema';

export default function useGetPosts(initialData: UniversalPost[]) {
  return useInfiniteQuery<UniversalPost[]>({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getPosts({ pageParam }),
    initialData: {
      pages: [initialData],
      pageParams: [{ native: 0, portfolio: 0 }],
    },
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      // iterate all pages and count pages of type "native" and "portfolio" into object keys

      const pageParam = allPages.reduce(
        (acc, page) => {
          page.forEach((post) => {
            if (post.type === 'native') {
              acc.native++;
            } else {
              acc.portfolio++;
            }
          });

          return acc;
        },
        { native: 0, portfolio: 0 }
      );

      return pageParam;
    },
    refetchOnWindowFocus: true,
    staleTime: Infinity,
  });
}
