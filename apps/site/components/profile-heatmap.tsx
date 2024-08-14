'use server';
import { cs } from 'date-fns/locale';
import { db } from 'db';
import { sql } from 'drizzle-orm';
import { portfolioPosts, portfolios, posts, profilesToPosts } from 'db/schema';
import { inTime, ServerDateInterval } from 'lib/date-utils';
import {
  format,
  subMonths,
  endOfWeek,
  startOfWeek,
  eachWeekOfInterval,
  getMonth,
  subWeeks,
} from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import classNames from 'classnames';
import { cache } from 'react';
import { unstable_noStore as noStore } from 'next/cache';

const loadHeatmap = cache(
  async (id: string, queryRange: ServerDateInterval) => {
    const { granularity, currentRange } = inTime(queryRange, 'week');

    /*return <pre>{JSON.stringify(some, null, 2)}</pre>; */
    const profileId = id;

    // join profiles and posts given user id and m:n relation
    const res = (await db.execute(
      sql`with
      profiles_portfolio_posts as (
        select
          ${portfolioPosts.id} as id,
          ${portfolioPosts.publishedAt} as created_at
        from ${portfolioPosts}
        join ${portfolios} on 
          ${portfolios.id} = ${portfolioPosts.portfolioId}
        where 
          ${portfolios.profileId} = ${profileId}
          and ${portfolioPosts.publishedAt}::date <@ ${currentRange}::daterange
      ),
      profiles_posts as (
        select
          ${posts.id} as id,
          ${posts.createdAt} as created_at
        from ${posts}
        join ${profilesToPosts} on 
          ${profilesToPosts.postId} = ${posts.id}
        where 
          ${profilesToPosts.profileId} = ${profileId}
          and ${posts.createdAt}::date <@ ${currentRange}::daterange
      ),
      posts_with_period as (
        select
          id,
          date_trunc(${granularity}, profiles_posts.created_at) as period 
        from profiles_posts 
        union
        select
          id,
          date_trunc(${granularity}, profiles_portfolio_posts.created_at) as period 
        from profiles_portfolio_posts
      ),
      posts_by_period as (
        select
          count(*) as posts,
          period
        from posts_with_period
        group by period
      )
      select * from posts_by_period
    `
    )) as { period: Date; posts: number }[];

    const counts = res.reduce((acc, { period, posts }) => {
      acc[
        format(period, 'yyyy/MM/dd', {
          weekStartsOn: 2,
          locale: cs,
        })
      ] = posts;
      return acc;
    }, {} as Map<string, number>);
    return counts;
  }
);

export async function Graph({ userId }: { userId: string }) {
  noStore();
  const now = endOfWeek(fromZonedTime(new Date(), 'Europe/Prague'), {
    weekStartsOn: 2,
  });
  const subTime = subMonths(now, 6);
  const start = startOfWeek(subTime, {
    weekStartsOn: 2,
  });
  const queryRange = { start: start, end: now };

  /* const data = res.map((r) => ({
    date: format(r.period, 'yyyy/MM/dd'),
    count: r.posts,
  })); */
  const counts = await loadHeatmap(userId, queryRange);
  const weeks = eachWeekOfInterval(
    {
      start: subTime,
      end: now,
    },
    {
      weekStartsOn: 1,
    }
  )
    .map((week) => fromZonedTime(week, 'Europe/Prague'))
    .map((week) => {
      const month = getMonth(week);
      const prevWeek = subWeeks(week, 1);
      const prevWeekMonth = getMonth(prevWeek);
      return {
        week: week,
        startOfMonth: prevWeekMonth !== month,
      };
    });
  weeks.pop();

  /* return (
    <pre>
      {JSON.stringify(res, null, 2)}
      {JSON.stringify(some, null, 2)}
      {JSON.stringify(
        weeks.map((week) =>
          format(week, 'yyyy/MM/dd', {
            weekStartsOn: 2,
            locale: cs,
          })
        ),
        null,
        2
      )}
      {JSON.stringify(counts, null, 2)}
    </pre>
  ); */

  return (
    <>
      <div className="">
        <p className="font-semibold text-slate">Týdenní pravidelnost</p>
        <div className="flex h-12 mt-6 space-x-1 items-center">
          {weeks.map((week, i) => {
            const weekstr = format(week.week, 'yyyy/MM/dd', {
              weekStartsOn: 2,
              locale: cs,
            });
            const isThisWeek = i === weeks.length - 1;
            return (
              <div
                key={i}
                className={classNames('relative h-4 w-4 rounded-md ', {
                  'bg-muted/60': !counts[weekstr],
                  'bg-purple': counts[weekstr] > 0,
                  'h-6 w-6': isThisWeek,
                })}
              >
                <div
                  className={classNames('absolute text-sm left-[1px]', {
                    '-top-[16px] left-[8px] text-center': isThisWeek,
                    '-top-[20px]': !isThisWeek,
                  })}
                >
                  {(week.startOfMonth ||
                    (i == 0 &&
                      !weeks[1].startOfMonth &&
                      !weeks[2].startOfMonth)) && (
                    <span
                      className={classNames(
                        'font-semibold block leading-none',
                        {
                          'text-slate': !isThisWeek,
                        }
                      )}
                    >
                      {format(week.week, 'MMM', {
                        weekStartsOn: 2,
                        locale: cs,
                      })}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
