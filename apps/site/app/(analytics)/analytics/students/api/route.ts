import { NextResponse } from 'next/server';
import supabase from 'lib/supabase';
import { getCohortsFromParamsString } from 'shared';

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
    }[];
    portfolio_pages: number;
    lastActivity: string;
  }[];
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cohortsParam = searchParams.get('cohorts');
    const cohorts = cohortsParam
      ? getCohortsFromParamsString(cohortsParam)
      : [];
    const p = searchParams.get('p'); // password

    if (p !== process.env.ANALYTICS_PASSWORD && p !== null)
      throw new Error('Password is incorrect.');
    // get pages from portfolios for given study cohort
    let query = supabase.from('profiles').select(
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
            scraped_data->publishedAt
          )
        )
      `
    );

    if (!(p === process.env.ANALYTICS_PASSWORD))
      query = query.eq('is_public', true);

    if (cohorts && cohorts.length) {
      const cohortsQuery = cohorts
        .map((cohort) => {
          return `and(study_start_semester_year.eq.${cohort.year},study_start_semester_kind.eq.${cohort.kind}))`;
        })
        .join(',');
      console.log(cohortsQuery);
      query = query.or(cohortsQuery);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    // count the number of portfolios published per month
    const profiles = data.map((profile) => {
      return {
        id: profile.id,
        study_start_semester_year: profile.study_start_semester_year,
        study_start_semester_kind: profile.study_start_semester_kind,
        username: profile.username,
        full_name: profile.full_name,
        is_public: profile.is_public,
        portfolios: profile.portfolios.map((portfolio) => {
          return {
            id: portfolio.id,
            title: portfolio.title,
            url: portfolio.url,
            image_url: portfolio.image_url,
          };
        }),
        portfolio_pages: profile.portfolios[0]?.portfolio_pages.length,
        lastActivity:
          profile.portfolios[0]?.portfolio_pages
            .map((page) =>
              page?.publishedAt ? new Date(page.publishedAt as string) : null
            )
            .sort((a, b) => (a < b ? 1 : -1))[0] || null,
      };
    });

    return NextResponse.json({
      data: profiles // sort profiles by lastActivity param, nulls last,
        .sort((a, b) => (a.lastActivity < b.lastActivity ? 1 : -1)),
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
