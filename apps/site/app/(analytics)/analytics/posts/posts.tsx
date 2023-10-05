'use client';
import BarChart from '../../../../components/chart/bar-chart';
import useAnalyticsGlobalFilter from '../../../../lib/hooks/use-analytics-global-filter';
import useApi from 'lib/use-api';
import Heading from '../heading';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { PostsApiResult } from './api/route';
import { LockClosedIcon } from '@radix-ui/react-icons';
import Tooltip from 'components/tooltip';
import PostsFilter from './posts-filter';
import { Avatar } from 'components/avatar';
import useAnalyticsAuth from 'lib/hooks/use-analytics-auth';
import { usePostsFilter } from './use-posts-filter';

export default function Posts() {
  const { cohorts } = useAnalyticsGlobalFilter();
  const { password } = useAnalyticsAuth();
  const { isTyping, getUrlSearchParams } = usePostsFilter();
  const searchParams = getUrlSearchParams();
  const url = new URL(process.env.NEXT_PUBLIC_APP_URL + '/analytics/posts/api');
  if (password) {
    searchParams.set('p', password);
  }
  if (cohorts) {
    searchParams.set(
      'cohorts',
      cohorts.map((cohort) => cohort.value).join('-')
    );
  }

  const { isLoading, isError, data } = useApi<PostsApiResult>(
    !isTyping ? url.toString() + '?' + searchParams.toString() : null
  );
  return (
    <div>
      <PostsFilter />
      <div className="rounded-xl bg-white px-2 py-4 mt-6">
        <Heading className="px-4 mb-3">
          {!isLoading && !isError && <>{data?.data?.length + ' příspěvků'}</>}
        </Heading>
        <div className="w-full h-64 relative">
          <BarChart
            data={data?.counts}
            dataKey="name"
            category="Počet příspěvků"
            showTooltip
          />
          {(isError || isLoading || !data?.counts || !data?.counts.length) && (
            <div className="absolute inset-0 flex items-center text-sm justify-center z-100">
              {isLoading
                ? 'Načítání'
                : isError
                ? 'Příspěvky se nepodařilo načíst.'
                : 'Žádné příspěvky'}
            </div>
          )}
        </div>
      </div>
      <div className="rounded-xl overflow-hidden mt-6">
        <table className="table-auto w-full text-sm text-left text-text">
          <thead className="text-xs text-text uppercase bg-white border-b border-snow">
            <tr>
              <th scope="col" className="px-6 py-3 text-lg font-extrabold">
                Příspěvek
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-extrabold">
                Téma
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-extrabold">
                Datum
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-extrabold">
                Autor
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.slice(0, 10).map((page) => {
              return (
                <tr
                  key={page.title}
                  className="bg-white border-b border-snow hover:bg-snow"
                >
                  <td className="px-6 py-4 flex items-center">
                    <Link
                      className="text-text hover:text-blue hover:underline"
                      href={
                        process.env.NEXT_PUBLIC_APP_URL +
                        '/analytics/p?url=' +
                        encodeURIComponent(page.url)
                      }
                    >
                      {page.title ? page.title : page.url}
                    </Link>{' '}
                    <Tooltip text="Otevřít originální stránku portfolia v nové kartě">
                      <Link
                        target="_blank"
                        href={page.url}
                        className="text-sm text-muted hover:text-text ml-1.5"
                      >
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 -ml-px -mt-px" />
                      </Link>
                    </Tooltip>
                  </td>
                  <td className="px-6 py-4">Design</td>
                  <td className="px-6 py-4">
                    {page?.published_at &&
                      new Date(page?.published_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-2">
                    <Link
                      className="text-text hover:text-blue flex items-center"
                      href={
                        process.env.NEXT_PUBLIC_APP_URL +
                        '/' +
                        page?.portfolios?.profiles?.username
                      }
                    >
                      {!page?.portfolios?.profiles?.is_public && (
                        <Tooltip text="K profilu máte přístup, student si však nepřeje aby byla URL adresa portfolia prozrazena.">
                          <LockClosedIcon className="w-4 h-4 mr-1 -ml-px -mt-px" />
                        </Tooltip>
                      )}{' '}
                      <Avatar
                        imageUrl={page?.portfolios?.image_url || ''}
                        className="rounded-full border border-smoke w-6 h-6 mr-2 text-"
                        size={32}
                        name={
                          page?.portfolios?.profiles?.full_name ||
                          page?.portfolios?.profiles?.username
                        }
                      />
                      <span className="">
                        {page?.portfolios?.profiles?.full_name}
                      </span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
