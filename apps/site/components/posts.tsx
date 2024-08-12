'use client';
import { Fragment, useEffect, useRef } from 'react';
import { Masonry } from 'masonic';
import { PostCard } from './post-card';
import LoadingIcon from './loading-icon';
import useOnScreen from 'lib/hooks/use-on-screen';
import useGetPosts from 'lib/hooks/use-get-posts';
import { UniversalPost } from 'lib/actions/get-posts';

export function Posts({
  posts,
  maxColumnCount = 4,
}: {
  posts: UniversalPost[];
  maxColumnCount?: number;
  username?: string;
  limit?: number;
}) {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetPosts(posts);

  useEffect(() => {
    if (isVisible && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isVisible]);

  return (
    <Fragment>
      <div className="flex -mr-4 md:-mr-6">
        {/*<pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>*/}
        <Masonry
          items={data?.pages?.flat()}
          render={PostCard}
          columnWidth={324}
          maxColumnCount={maxColumnCount}
        />
      </div>
      <div className="items-centers flex justify-center mb-20 mt-2">
        {isFetchingNextPage && hasNextPage ? (
          <div>
            <LoadingIcon />
          </div>
        ) : (
          'Žádné další příspěvky'
        )}
      </div>
      <div ref={ref}></div>
    </Fragment>
  );
}
