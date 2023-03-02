import { useInfiniteQuery } from '@supabase-cache-helpers/postgrest-swr';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { GenericSchema } from '@supabase/postgrest-js/dist/module/types';

export default function useApiInfinite<
  Schema extends GenericSchema,
  Table extends Record<string, unknown>,
  Result extends Record<string, unknown>
>(
  query: PostgrestFilterBuilder<Schema, Table, Result> | null,
  pageSize: number
) {
  const { data, size, setSize, isValidating, error, mutate } = useInfiniteQuery(
    query,
    { pageSize: pageSize, revalidateOnFocus: false }
  );
  const isLoadingInitialData = !error && !data;
  const isEmpty = data?.[0]?.length === 0;

  return {
    mutate,
    size,
    setSize,
    data: data ? [].concat(...data) : [],
    isLoadingInitialData,
    isLoadingMore:
      isLoadingInitialData ||
      (size > 0 && data && typeof data[size - 1] === 'undefined'),
    isEmpty,
    isReachingEnd:
      isEmpty || (data && data[data.length - 1]?.length < pageSize),
    isRefreshing: isValidating && data && data.length === size,
    isError: error,
  };
}
