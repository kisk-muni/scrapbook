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
import classNames from 'classnames';
import { cache } from 'react';
import { auth } from 'auth';

const loadHeatmap = cache(
  async (userName: string, queryRange: ServerDateInterval) => {
    const session = await auth();
    const { granularity, currentRange } = inTime(queryRange, 'week');

    const profile = await db.query.profiles
      .findFirst({
        where: (profiles, { eq }) => eq(profiles.username, userName),
      })
      .then((profile) => {
        if (!profile) return null;
        return profile;
      });

    if (!profile) return null;
    if (!profile.isPublic && session?.user?.id !== profile.id) return null;
    const profileId = profile?.id;

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

    console.log('res', res);

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

export async function ProfileHeatmap({ userName }: { userName: string }) {
  const now = endOfWeek(new Date());
  const subTime = subMonths(now, 6);
  const start = startOfWeek(subTime);
  const queryRange = { start: start, end: now };

  const counts = await loadHeatmap(userName, queryRange);
  if (!counts) return null;
  const weeks = eachWeekOfInterval(
    {
      start: subTime,
      end: now,
    },
    {
      weekStartsOn: 1,
    }
  ).map((week) => {
    const month = getMonth(week);
    const prevWeek = subWeeks(week, 1);
    const prevWeekMonth = getMonth(prevWeek);
    return {
      week: week,
      startOfMonth: prevWeekMonth !== month,
    };
  });

  return (
    <div className="hidden lg:flex flex-col justify-center">
      <p className="font-semibold text-slate">Týdenní pravidelnost</p>
      <div className="flex h-12 mt-6 space-x-1 items-center">
        {weeks.map((week, i) => {
          const weekstr = format(week.week, 'yyyy/MM/dd');
          const isThisWeek = i === weeks.length - 1;
          return (
            <div
              key={i}
              className={classNames('relative h-4 w-4 rounded-md ', {
                'bg-muted/60': !counts[weekstr],
                'bg-purple': counts[weekstr] > 0,
                'h-6 w-6': isThisWeek,
                'hidden xl:block': i < 5,
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
                    className={classNames('font-semibold block leading-none', {
                      'text-slate': !isThisWeek,
                    })}
                  >
                    {format(week.week, 'MMM', {
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
  );
}
