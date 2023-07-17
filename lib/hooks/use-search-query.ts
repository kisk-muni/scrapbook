import { Item } from 'components/input/filter-select';
import {
  createContext,
  Dispatch,
  useState,
  SetStateAction,
  useContext,
} from 'react';

type LightItem = Omit<Item, 'label'> & { filter: string };

type Query = LightItem[];

export function parseSearchQuery(
  query: string,
  allowedParams: string[]
): Query {
  const queryParts = query.split(' ');
  const result: Query = [];
  queryParts.forEach((part) => {
    const [key, _sep, value] = part.split(/(:)/);
    const filter = {
      filter: key || 'keyword',
      value,
    };
    if (allowedParams.includes(key)) {
      if (
        result.findIndex(
          (item) => item.filter == filter.filter && item.value == filter.value
        ) == -1
      ) {
        result.push(filter);
      }
    }
  });
  return result;
}

export function searchQueryToString(query?: Query): string {
  return query?.map((item) => `${item.filter}:${item.value}`).join(' ') || '';
}

export type Payload<T> = {
  param: string;
  value: T;
};

export function useQuery(defaultQuery: Query = [], allowedParams: string[]) {
  const [query, set] = useState<Query>(defaultQuery);
  const searchQueryString = () => searchQueryToString(query);

  const setFromString = (searchQueryString: string) =>
    set(parseSearchQuery(searchQueryString, allowedParams));

  const isEmpty =
    Object.keys(query).length == 0 ||
    (Object.keys(query).length === 1 &&
      query.length == 1 &&
      query[0].filter == 'keyword' &&
      query[0].value == '');

  const queryString = searchQueryString();

  return {
    query,
    set,
    setFromString,
    queryString,
    //setParamFilter,
    isEmpty,
  };
}

type SearchQueryDataContextType = {
  query: Query;
  set: Dispatch<SetStateAction<Query>>;
  setFromString: (searchQueryString: string) => void;
  queryString: string;
  setParamFilter: ({ param, value }: Payload<string[]>) => void;
  isEmpty: boolean;
};

export const SearchQueryContext =
  createContext<SearchQueryDataContextType | null>(null);

export default function useQueryContext() {
  const result = useContext(SearchQueryContext);
  if (!result) {
    throw new Error();
  }
  return result;
}
