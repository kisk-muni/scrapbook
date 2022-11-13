import useSWRInfinite from 'swr/infinite';
import fetcher from './fetcher';

export default function useApiInfinite<T>(api: string, pageSize: number) {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<
    T[]
  >(
    (pageIndex, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.length == 0) return null;
      // paginate
      return api + `&limit=${pageSize}&offset=${pageSize * pageIndex}`;
    },
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const isLoadingInitialData = !error && !data;
  const isEmpty = data?.[0]?.length === 0;

  return {
    mutate,
    size,
    setSize,
    data: data ? ([].concat(...data) as T[]) : ([] as T[]),
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
