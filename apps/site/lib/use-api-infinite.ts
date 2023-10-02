/* eslint-disable @typescript-eslint/no-unused-vars */
import { useOffsetInfiniteScrollQuery } from '@supabase-cache-helpers/postgrest-swr';
import { PostgrestTransformBuilder } from '@supabase/postgrest-js';
import { GenericSchema } from '@supabase/postgrest-js/dist/module/types';

export default function useApiInfinite<
  Schema extends GenericSchema,
  Table extends Record<string, unknown>,
  Result extends Record<string, unknown>,
  Relationships = unknown
>(
  query: PostgrestTransformBuilder<
    Schema,
    Table,
    Result[],
    Relationships
  > | null,
  pageSize: number
) {
  const { data, size, setSize, isValidating, isLoading, error, mutate } =
    useOffsetInfiniteScrollQuery(query, {
      pageSize: pageSize,
      revalidateOnFocus: false,
    });
  const isLoadingInitialData = !error && !data;
  const isEmpty = data?.[0]?.length === 0;

  const len = data[data.length - 1]?.length as number;

  return {
    mutate,
    size,
    setSize,
    data: data ? [].concat(...data) : [],
    isLoading,
    isLoadingInitialData,
    isLoadingMore:
      !isLoadingInitialData ||
      (size > 0 && data && typeof data[size - 1] === 'undefined'),
    isEmpty,
    isReachingEnd: isEmpty || (data && len < pageSize),
    isRefreshing: isValidating && data && data.length === size,
    isError: error,
  };
}
