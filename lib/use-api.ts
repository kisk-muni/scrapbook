import useSWR from 'swr';
import fetcher from 'lib/fetcher';

export default function useApi<T>(api: string) {
  const { data, error } = useSWR<T>(api, fetcher, { revalidateOnFocus: false });

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
