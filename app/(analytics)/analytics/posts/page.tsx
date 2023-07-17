'use client';
import { SearchQueryContext, useQuery } from 'lib/hooks/use-search-query';
import Posts from './posts';

export default function AnalyticsHomePage() {
  const allowedParams = [
    'kind',
    'course',
    'lang',
    'sentiment',
    'category',
    'profiling',
  ];
  const query = useQuery([], allowedParams);
  return (
    <SearchQueryContext.Provider value={query}>
      <div className="w-full">
        <Posts />
      </div>
    </SearchQueryContext.Provider>
  );
}
