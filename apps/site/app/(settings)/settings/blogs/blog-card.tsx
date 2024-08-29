'use client';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Button } from 'components/ui/button-radix';
import {
  IconCheckCircleFilled,
  IconCircleDashed,
  IconSpinner,
} from 'components/ui/icons';
import { PortfolioWithPosts } from './blog-card-list';
import BlogSettingCard from './blog-setting-card';
import toast from 'react-hot-toast';
import { updateBlog, deleteBlog, syncBlogFeed } from './actions';

type SynchronizationStatus = 'success' | 'error' | 'waiting';

function SynchronizationStatus({ status }: { status: SynchronizationStatus }) {
  return (
    <div className="flex items-center">
      {status == 'success' ? (
        <IconCheckCircleFilled className="w-6 h-6 text-purple" />
      ) : status == 'waiting' ? (
        <IconSpinner className="w-6 h-6 animate-spin text-muted" />
      ) : (
        <IconCircleDashed className="w-6 h-6 text-muted" />
      )}
      <span className="text-base ml-2">
        {status == 'success'
          ? 'Synchronizace je funkční'
          : status == 'waiting'
          ? 'Připojování…'
          : 'Synchronizace nefunguje'}
      </span>
    </div>
  );
}

export function BlogCard({ portfolio }: { portfolio: PortfolioWithPosts }) {
  const [isFeedSyncPending, startFeedSyncTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

  const syncFeed = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    startFeedSyncTransition(async () => {
      const result = await syncBlogFeed({
        id: portfolio.id,
      });
      if (result && 'error' in result) {
        toast.error(result.error);
        return;
      }
    });
  };

  return (
    <div>
      {!isEditing ? (
        <div className="bg-elevated px-8 py-6 rounded-xl flex items-start justify-between">
          <div>
            <Link href={portfolio.url} className="flex">
              <h3 className="text-lg font-semibold">
                {new URL(portfolio.url).toString()}
              </h3>
            </Link>
            {portfolio.platform !== 'custom' && (
              <p className="text-base text-muted mt-1">{portfolio.platform}</p>
            )}
            <div className="flex space-x-6 mt-4">
              <SynchronizationStatus
                status={portfolio.lastCrawlFeedlStatus as SynchronizationStatus}
              />
              {portfolio.lastCrawlFeedlStatus === 'success' && (
                <div className="flex items-center">
                  <div className="h-5 px-1 text-sm font-semibold flex items-center justify-center rounded-full bg-muted text-white">
                    {portfolio.portfolioPosts.length}
                  </div>
                  <span className="text-base ml-2">Příspěvků</span>
                </div>
              )}
              {portfolio.portfolioPages.length > 0 && (
                <div className="flex items-center">
                  <div className="h-5 px-1 text-sm font-semibold flex items-center justify-center rounded-full bg-muted text-white">
                    {portfolio.portfolioPages.length}
                  </div>
                  <span className="text-base ml-2">Stránek</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              disabled={isFeedSyncPending}
              onClick={syncFeed}
            >
              {isFeedSyncPending ? (
                <>
                  <IconSpinner className="w-4 h-4 mr-2 animate-spin" />
                  Synchronizování...
                </>
              ) : (
                <>Synchronizovat</>
              )}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsEditing(!isEditing)}
            >
              Upravit
            </Button>
          </div>
        </div>
      ) : (
        <BlogSettingCard
          id={portfolio.id}
          defaultFeedUrl={portfolio.feedUrl}
          defaultUrl={portfolio.url}
          onClose={() => setIsEditing(false)}
          deleteBlog={deleteBlog}
          updateBlog={updateBlog}
        />
      )}
    </div>
  );
}
