import { NextResponse } from 'next/server';
import supabase from 'lib/supabase';

export type StudentsApiResult = {
  data: {
    id: string;
    study_start_semester_year: number;
    study_start_semester_kind: string;
    username: string;
    full_name: string;
    is_public: boolean;
    portfolios: {
      id: string;
      title: string;
      url: string;
      image_url: string;
      portfolio_pages: {
        count: number;
      }[];
    }[];
  }[];
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
      .from('profiles')
      .select(
        `
        id,
        study_start_semester_year,
        study_start_semester_kind,
        username,
        full_name,
        is_public,
        portfolios(
          id,
          title,
          url,
          image_url,
          portfolio_pages(
            count 
          )
        )
      `
      )
      .order('full_name', { ascending: false });

    if (!(p === process.env.ANALYTICS_PASSWORD))
      query = query.eq('is_public', true);

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

    // return
    return NextResponse.json({
      data,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
