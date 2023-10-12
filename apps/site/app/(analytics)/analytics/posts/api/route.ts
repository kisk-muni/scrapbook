import { NextResponse } from 'next/server';
import supabase from 'lib/supabase';
import { SearchPages } from 'shared';
import { parseISO } from 'date-fns';
import { filters } from '../filters';
import { cohortsFilter } from 'shared';

export type Counts = {
  name: string;
  'Počet příspěvků': number;
}[];

export type Profiling = {
  name: string;
  value: number;
}[];

export type DatabaseResult = SearchPages['Returns'];

export type PostsApiResult = {
  data: SearchPages['Returns'][number]['filtered_portfolio_pages']['data'];
  counts: Counts;
};

export const PAGE_SIZE = 40;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // const keyword = searchParams.get('keyword');
    const p = searchParams.get('p'); // password
    if (p !== process.env.ANALYTICS_PASSWORD && p !== null)
      throw new Error('Password is incorrect.');
    const filtersWithCohorts = { ...filters, ...cohortsFilter };

    const parsedParams: {
      [key: string]: string[] | string | boolean | null;
    } = {};
    Object.keys(filtersWithCohorts).forEach((filterName) => {
      if (filterName === 'showDebug') return;
      const filter = filtersWithCohorts[filterName];
      const filterValue = searchParams.get(filter.tag as unknown as string);
      if (filterValue) {
        const parsedValue = filter.parser.parse(filterValue);
        parsedParams[filterName] = Array.isArray(parsedValue)
          ? (filter.parser
              .parse(filterValue)
              .map((item) => item.value) as string[])
          : (parsedValue as string | boolean);
      } else {
        parsedParams[filterName] = null;
      }
    });
    console.log(searchParams.get('kinds'));
    const cohortsJson = Array.isArray(parsedParams.cohorts)
      ? ((parsedParams.cohorts as unknown as string[])
          .map((cohort) => {
            const matches = cohort.match(/^(\d+)([a-zA-Z]+)/);
            if (matches) {
              const year = parseInt(matches[1], 10);
              const kind = matches[2];
              return {
                year,
                kind: kind === 'jaro' ? kind : null,
              };
            }
          })
          .filter((cohort) => cohort != undefined) as {
          year: number;
          kind: 'jaro' | null;
        }[])
      : [];

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = PAGE_SIZE;
    const offset = (page - 1) * PAGE_SIZE;

    const rpcParams = {
      cohorts: cohortsJson,
      keywords: parsedParams.keyword as string,
      courses: parsedParams.courses as string[],
      kinds: parsedParams.kinds as string[],
      profilations: parsedParams.profilations as string[],
      tones: parsedParams.tones as string[],
      languages: parsedParams.languages as string[],
      items_limit: limit,
      items_offset: offset,
      show_private: p === process.env.ANALYTICS_PASSWORD,
    };
    const { data, error } = await supabase.rpc('search_pages', rpcParams);

    console.log(data);

    const dbResult = data[0][
      'filtered_portfolio_pages'
    ] as unknown as DatabaseResult[number]['filtered_portfolio_pages'];

    //const { data, error } = await query;
    if (error) throw new Error(error.message);
    //console.log(data);
    // count the number of portfolios published per month
    /* const countsObj = (data as unknown as Row[]).reduce((counts, obj) => {
      const publishedAt = !obj['published_at']
        ? null
        : parseISO(obj['published_at']);
      if (!publishedAt) {
        counts['bez datumu'] = (counts['bez datumu'] || 0) + 1;
        return counts;
      }

      const year = publishedAt.getFullYear();
      const month = publishedAt.getMonth();

      const key = `${year}-${month}`;
      counts[key] = (counts[key] || 0) + 1;

      return counts;
    }, {});

    // convert to array of objects for recharts.js
    const counts = Object.keys(countsObj).map((key) => ({
      name: key,
      'Počet příspěvků': countsObj[key],
    })); */

    // return
    return NextResponse.json({
      data: dbResult.data || [],
      counts:
        dbResult.counts?.map((count) => {
          const period = count.filter_period_begin
            ? parseISO(count.filter_period_begin)
            : null;
          return {
            name: count.filter_period_begin
              ? `${period.getFullYear()}-${period.getMonth()}`
              : 'bez datumu',
            'Počet příspěvků': parseInt(count.sum, 10),
          };
        }) || [],
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
