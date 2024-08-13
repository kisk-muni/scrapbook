'use server';
import { cs } from 'date-fns/locale';
import { db } from 'db';
import { sql } from 'drizzle-orm';
import { portfolioPosts, portfolios, posts, profilesToPosts } from 'db/schema';
import { inTime } from 'lib/date-utils';
import {
  format,
  subMonths,
  endOfWeek,
  startOfWeek,
  eachWeekOfInterval,
  getWeek,
} from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import classNames from 'classnames';

export async function Graph({ userId }: { userId: string }) {
  const now = endOfWeek(fromZonedTime(new Date(), 'Europe/Prague'), {
    weekStartsOn: 2,
  });
  const subTime = subMonths(now, 4);
  const start = startOfWeek(subTime, {
    weekStartsOn: 2,
  });
  const queryRange = { start: start, end: now };
  const { granularity, currentRange } = inTime(queryRange, 'week');

  /*return <pre>{JSON.stringify(some, null, 2)}</pre>; */
  const profileId = userId;

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

  // convert res to a map of date and count
  const counts = res.reduce((acc, { period, posts }) => {
    acc[
      format(period, 'yyyy/MM/dd', {
        weekStartsOn: 2,
        locale: cs,
      })
    ] = posts;
    return acc;
  }, {} as Map<string, number>);

  /* const data = res.map((r) => ({
    date: format(r.period, 'yyyy/MM/dd'),
    count: r.posts,
  })); */
  const weeks = eachWeekOfInterval(
    {
      start: subTime,
      end: now,
    },
    {
      weekStartsOn: 1,
    }
  ).map((week) => fromZonedTime(week, 'Europe/Prague'));
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
            const weekNum = getWeek(week, {
              weekStartsOn: 2,
              locale: cs,
            });
            const weekstr = format(week, 'yyyy/MM/dd', {
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
                  className={classNames('absolute left-[1px]', {
                    '-top-[42px] text-base text-center': isThisWeek,
                    '-top-[20px] text-sm': !isThisWeek,
                  })}
                >
                  {(isThisWeek || weekNum % 5 == 0) && (
                    <span
                      className={classNames(
                        'font-semibold block whitespace-wrap leading-none -rotate-45',
                        {
                          'text-text': isThisWeek,
                          'text-slate': !isThisWeek,
                        }
                      )}
                    >
                      {isThisWeek ? `Aktuální týden` : 'T' + weekNum}
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
