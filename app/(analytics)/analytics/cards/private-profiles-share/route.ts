import { NextResponse } from 'next/server';
import supabase from 'lib/supabase';

export type Counts = {
  name: string;
  count: number;
}[];

export type PrivateProfilesShareApiResult = {
  counts: Counts;
};

type Row = {
  is_public: boolean;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cohort = searchParams.get('cohort');
    let query = supabase.from('profiles').select(
      `
        is_public
      `
    );

    if (cohort && cohort != 'all' && cohort != '') {
      const matches = (cohort as string).match(/^(\d+)([a-zA-Z]+)/);
      if (matches) {
        const year = parseInt(matches[1], 10);
        console.log(year);
        query = query.eq('study_start_semester_year', year);
        //const kind = matches[2];
        //query = query.eq('portfolios.profiles.study_start_semester_kind', kind);
      }
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    //console.log(data);
    // count the number of portfolios published per month
    const countsObj = (data as unknown as Row[]).reduce((counts, obj) => {
      if (obj.is_public === false) {
        counts['Neveřejné'] = (counts['Neveřejné'] || 0) + 1;
        return counts;
      }
      counts['Veřejné'] = (counts['Veřejné'] || 0) + 1;
      return counts;
    }, {});

    // convert to array of objects for recharts.js
    const counts = Object.keys(countsObj).map((key) => ({
      name: key,
      count: countsObj[key],
    }));

    // return
    return NextResponse.json({
      counts: counts.sort((a, b) => a.name.localeCompare(b.name)),
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
