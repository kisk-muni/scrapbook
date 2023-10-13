'use client';
import BarChart from '../../../../components/chart/bar-chart';
import useAnalyticsGlobalFilter from '../../../../lib/hooks/use-analytics-global-filter';
import useSWRInfinite from 'swr/infinite';
import Heading from '../heading';
import Link from 'next/link';
import { PostsApiResult } from './api/route';
import { LockClosedIcon } from '@radix-ui/react-icons';
import Tooltip from 'components/tooltip';
import PostsFilter from './posts-filter';
import { Avatar } from 'components/avatar';
import useAnalyticsAuth from 'lib/hooks/use-analytics-auth';
import { usePostsFilter } from './use-posts-filter';
import {
  Table,
  TableCell,
  TableColumn,
  TableRow,
  TableBody,
} from '@nextui-org/table';
import { TableHeader } from 'react-stately';
import { Key, useCallback } from 'react';
import {
  SearchPages,
  contentTypesByValue,
  coursesByCode,
  profilationsByValue,
} from 'shared';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import Button from 'components/input/button';
import fetcher from 'lib/fetcher';
import { useDebounce } from 'use-debounce';
import { tonesByValue } from 'shared';

function useUrlWithParams() {
  const { cohorts } = useAnalyticsGlobalFilter();
  const { password } = useAnalyticsAuth();
  const { getUrlSearchParams } = usePostsFilter();
  const searchParams = getUrlSearchParams();
  const url = new URL('/api');
  if (password) {
    searchParams.set('p', password);
  }
  if (cohorts) {
    searchParams.set(
      'cohorts',
      cohorts.map((cohort) => cohort.value).join('-')
    );
  }
  return {
    url: url.toString() + '?' + searchParams.toString(),
  };
}

const PAGE_SIZE = 40;

/* function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  } else {
    return str;
  }
} */

type Item =
  SearchPages['Returns'][number]['filtered_portfolio_pages']['data'][number];

const TableColName = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex border-b border-snow grow pt-4 pb-4 px-6 text-lg font-extrabold">
      {children}
    </div>
  );
};

export default function Posts() {
  const { url } = useUrlWithParams();
  const [debouncedUrl] = useDebounce(url, 400);

  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<PostsApiResult>(
      (index) => debouncedUrl + '&page=' + (index + 1),
      fetcher,
      {
        keepPreviousData: true,
      }
    );

  // helpers
  const isError = !data && error;
  const isLoadingMore =
    isLoading && size > 0 && data && typeof data[size - 1] === 'undefined';
  const notEmpty = Boolean(
    data && data?.length && data[0].data && data[0].data.length
  );

  // for rendering the chart statistics
  const dataCounts = data?.length ? data[0].counts : [];
  const totalCount = data?.length
    ? data
      ? dataCounts?.reduce((prev, curr) => prev + curr['Počet příspěvků'], 0)
      : 0
    : 0;

  // for rendering the table
  const pages: Item[] = data ? [].concat(...data.map((val) => val.data)) : [];
  const remainingCount = totalCount - pages.length;
  const noMorePages = remainingCount <= 0;
  const nextPage = remainingCount < PAGE_SIZE ? remainingCount : PAGE_SIZE;
  const debouncedEmpty = useDebounce(!notEmpty, 60);

  const renderCell = useCallback((post: Item, columnKey: Key) => {
    const cellValue = post[columnKey as keyof Item]
      ? post[columnKey as keyof Item]
      : '';
    switch (columnKey as keyof Item) {
      case 'title':
        return (
          <div className="flex items-center">
            <Tooltip
              content={
                <span className="text-sm text-white max-w-[600px]">
                  {post?.description}
                </span>
              }
            >
              <Link
                className="text-text hover:text-blue hover:underline"
                href={
                  process.env.NEXT_PUBLIC_APP_URL +
                  '/analytics/p?url=' +
                  encodeURIComponent(post.url)
                }
              >
                {post.title ? post.title : post.url}
              </Link>
            </Tooltip>{' '}
            <Tooltip text="Otevřít originální stránku portfolia v nové kartě">
              <Link
                target="_blank"
                href={post.url}
                className="text-sm text-muted hover:text-text ml-1.5"
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4 -ml-px -mt-px" />
              </Link>
            </Tooltip>
          </div>
        );
      case 'tones':
        return (
          <div>
            {post.tones?.map((value) => {
              const tone = tonesByValue[value];
              return (
                <div
                  key={value}
                  className="inline-block rounded-full bg-[#e7e7e7] border border-white text-base px-2 mr-0.5 mb-0.5 whitespace-nowrap break-keep"
                >
                  {tone.emoji} {tone.label}
                </div>
              );
            })}
          </div>
        );
      case 'categories':
        return (
          <div>
            {post.categories?.map((value) => {
              const profilation = profilationsByValue[value];
              return (
                <div
                  key={value}
                  className="inline-block rounded-full bg-[#e7e7e7] border border-white text-base px-2 mr-1 mb-1 whitespace-nowrap break-keep"
                >
                  {profilation.emoji} {profilation.label}
                </div>
              );
            })}
          </div>
        );
      case 'courses':
        return (
          <div className="max-w-48">
            {post.courses.slice(0, 5).map((code) => {
              const course = coursesByCode[code];
              // const count = post.courses.length;
              // const renderFull = count <= 2;
              if (!course) return null;
              return (
                <Tooltip key={code} text={course.title} delayDuration={20}>
                  <div
                    key={code}
                    className="inline-block cursor-help rounded-full bg-[#e7e7e7] border border-white text-base px-2 mr-1 mb-1 whitespace-nowrap break-keep"
                  >
                    {course?.code}
                    {/*renderFull && ` ${truncateString(course?.title, 20)}`*/}
                  </div>
                </Tooltip>
              );
            })}
            {post.courses.length > 5 && (
              <Tooltip
                content={
                  <div className="block text-sm leading-none text-white grid grid-cols-1 gap-2">
                    {post.courses.slice(5).map((code) => (
                      <div key={code}>
                        {code} {coursesByCode[code]?.title}
                      </div>
                    ))}
                  </div>
                }
                delayDuration={20}
              >
                <div
                  key={'more'}
                  className="inline-block cursor-help rounded-full bg-[#e7e7e7] border border-white text-base px-2 mr-1 mb-1 whitespace-nowrap break-keep"
                >
                  + {post.courses.length - 5}
                </div>
              </Tooltip>
            )}
          </div>
        );
      case 'content_types':
        return (
          <div>
            {post.content_types?.map((value) => {
              const type = contentTypesByValue[value];
              return <div key={value}>{type.label}</div>;
            })}
          </div>
        );
      case 'portfolios':
        return (
          <Link
            className="text-text hover:text-blue flex items-center"
            href={
              process.env.NEXT_PUBLIC_APP_URL +
              '/' +
              post.portfolios?.profiles?.username
            }
          >
            {!post.portfolios?.profiles?.is_public ? (
              <Tooltip text="K profilu máte přístup, student si však nepřeje aby byla URL adresa portfolia prozrazena.">
                <LockClosedIcon className="w-4 h-4 mr-1 -ml-px -mt-px" />
              </Tooltip>
            ) : (
              <div className="w-4 h-4 mr-1 -ml-px -mt-px"></div>
            )}{' '}
            <Avatar
              imageUrl={post.portfolios?.image_url || ''}
              className="rounded-full border border-smoke w-6 h-6 mr-2 text-"
              size={32}
              name={
                post.portfolios?.profiles?.full_name ||
                post.portfolios?.profiles?.username
              }
            />
            <span className="">{post.portfolios?.profiles?.full_name}</span>
          </Link>
        );
      case 'published_at':
        return post.published_at && !Array.isArray(post.published_at)
          ? new Date(post.published_at).toLocaleDateString()
          : '';
      default:
        return typeof cellValue === 'string'
          ? cellValue
          : cellValue?.toString();
    }
  }, []);

  return (
    <div>
      <PostsFilter />
      {(() => {
        if (notEmpty) {
          return (
            <div className="rounded-xl bg-white px-2 py-4 mt-6">
              <Heading className="px-4 mb-3">
                {isLoading || isValidating ? (
                  <div className="animate-pulse h-7 flex gap-2">
                    <div className="w-10 text-text h-5 rounded-full bg-smoke"></div>
                    <div className="h-5 w-32 rounded-full bg-smoke"></div>
                  </div>
                ) : (!isLoading || !isValidating) && !isError ? (
                  <>{totalCount + ' příspěvků'}</>
                ) : (
                  <div className="h-7"> </div>
                )}
              </Heading>
              <div className="w-full h-64 relative">
                {!isError && (
                  <BarChart
                    data={dataCounts}
                    dataKey="name"
                    category="Počet příspěvků"
                    showTooltip
                  />
                )}
              </div>
            </div>
          );
        }
        if (isLoading) {
          return (
            <div className="rounded-xl bg-white px-2 py-4 mt-6 animate-pulse">
              <div className="h-7 mb-3"></div>
              <div className="h-64"></div>
            </div>
          );
        }
        return (
          <div className="rounded-xl bg-white h-[328px] px-2  mt-6 flex items-center justify-center">
            {isError && 'Příspěvky se nepodařilo načíst.'}
            {debouncedEmpty && 'Žádné příspěvky'}
          </div>
        );
      })()}

      {notEmpty && !isError && (
        <Table
          classNames={{
            wrapper: `rounded-xl p-0 mt-6 gap-0 overflow-visible ${
              isLoading ? 'animate-pulse' : ''
            }`,
            thead:
              'text-xs z-20 text-text uppercase border-b border-snow last:[&>tr]:hidden',
            table: 'table-auto w-full text-base text-left text-text',
            th: 'first:rounded-tl-xl last:rounded-tr-xl bg-white z-20 sticky px-0 py-0 top-0',
            tbody:
              '[&>tr]:border-b last:[&>tr]:overflow-hidden [&>tr]:border-snow [&>tr]:bg-white hover:[&>tr]:bg-snow/70',
            td: 'px-6 py-4',
          }}
          bottomContent={
            <div className="rounded-bl-xl rounded-br-xl bg-white">
              {(() => {
                // eslint-disable-next-line no-constant-condition
                if (!noMorePages) {
                  return (
                    <div className="flex w-full justify-center my-4">
                      <Button
                        isDisabled={isLoading}
                        className="h-10"
                        onPress={() => {
                          setSize(size + 1);
                        }}
                      >
                        {isLoading ? (
                          'Načítání...'
                        ) : (
                          <>
                            Načíst další
                            {' – '}
                            {remainingCount == nextPage
                              ? `${remainingCount}`
                              : `${nextPage} z ${remainingCount}`}
                          </>
                        )}
                      </Button>
                    </div>
                  );
                }
              })()}
            </div>
          }
        >
          <TableHeader>
            <TableColumn key="title">
              <TableColName>Příspěvek</TableColName>
            </TableColumn>
            <TableColumn key="content_types">
              <TableColName>Druh</TableColName>
            </TableColumn>
            <TableColumn key="categories">
              <TableColName>Profilace</TableColName>
            </TableColumn>
            <TableColumn key="tones">
              <TableColName>Sentiment</TableColName>
            </TableColumn>
            <TableColumn key="courses">
              <TableColName>Kurz</TableColName>
            </TableColumn>
            <TableColumn key="published_at">
              <TableColName>Datum</TableColName>
            </TableColumn>
            <TableColumn key="portfolios">
              <TableColName>Autor</TableColName>
            </TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading || isValidating}
            loadingContent={
              <div className="absolute inset-0 bg-sheet/60"></div>
            }
            emptyContent={<div className="my-4">Žádné příspěvky</div>}
            items={pages || []}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
