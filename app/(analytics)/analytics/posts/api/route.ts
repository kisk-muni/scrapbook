import { NextResponse } from 'next/server';
import supabase from 'lib/supabase';
import { parseISO } from 'date-fns';

export type Counts = {
  name: string;
  'Počet příspěvků': number;
}[];

export type Profiling = {
  name: string;
  value: number;
}[];

export type PostsApiResult = {
  data: {
    title: string;
    published_at: string | null;
    url: string;
    portfolios: {
      image_url?: string;
      profiles: {
        study_start_semester_year: number;
        study_start_semester_kind: string;
        username: string;
        full_name: string;
        is_public: boolean;
      };
    };
  }[];
  counts: Counts;
  profiling: Profiling;
};

type Row = {
  published_at: string | null;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cohort = searchParams.get('cohort');
    // const keyword = searchParams.get('keyword');
    const p = searchParams.get('p'); // password
    if (p !== process.env.ANALYTICS_PASSWORD && p !== null)
      throw new Error('Password is incorrect.');
    // get pages from portfolios for given study cohort
    let query = supabase
      .from('portfolio_pages')
      .select(
        `
        title:data->title,
        url,
        published_at:data->published-at,
        portfolios!inner(
          image_url,
          profiles!inner(
            study_start_semester_year,
            study_start_semester_kind,
            username,
            full_name,
            is_public
          )
        )
      `
      )
      .not('data->post-content->text', 'is', null)
      .order('data->published-at', { ascending: false });

    if (!(p === process.env.ANALYTICS_PASSWORD))
      query = query.eq('portfolios.profiles.is_public', true);

    if (cohort && cohort != 'all' && cohort != '') {
      const matches = (cohort as string).match(/^(\d+)([a-zA-Z]+)/);
      if (matches) {
        const year = parseInt(matches[1], 10);
        console.log(year);
        query = query.eq('portfolios.profiles.study_start_semester_year', year);
        //const kind = matches[2];
        //query = query.eq('portfolios.profiles.study_start_semester_kind', kind);
      }
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    //console.log(data);
    // count the number of portfolios published per month
    const countsObj = (data as unknown as Row[]).reduce((counts, obj) => {
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
    }));

    // return
    return NextResponse.json({
      data,
      counts: counts.sort((a, b) => a.name.localeCompare(b.name)),
      profiling: [
        {
          name: 'design',
          value: 50,
        },
        {
          name: 'data analytics',
          value: 43,
        },
        {
          name: 'edtech',
          value: 60,
        },
        {
          name: 'librarianship',
          value: 3,
        },
      ],
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
