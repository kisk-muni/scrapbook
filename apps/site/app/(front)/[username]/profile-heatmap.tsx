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
import { cs } from 'date-fns/locale';
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
      sql`WITH
      profiles_portfolio_posts AS (
        SELECT
          ${portfolioPosts.id} AS id,
          ${portfolioPosts.publishedAt} AS created_at
        FROM ${portfolioPosts}
        JOIN ${portfolios} ON
          ${portfolios.id} = ${portfolioPosts.portfolioId}
        WHERE
          ${portfolios.profileId} = ${profileId}
          AND ${portfolioPosts.publishedAt}::date <@ ${currentRange}::daterange
      ),
      profiles_posts AS (
        SELECT
          ${posts.id} AS id,
          ${posts.createdAt} AS created_at
        FROM ${posts}
        JOIN ${profilesToPosts} ON
          ${profilesToPosts.postId} = ${posts.id}
        WHERE
          ${profilesToPosts.profileId} = ${profileId}
          AND ${posts.createdAt}::date <@ ${currentRange}::daterange
      ),
      posts_with_period AS (
        SELECT
          id,
          date_trunc(${granularity}, profiles_posts.created_at) AS period
        FROM profiles_posts
        UNION
        SELECT
          id,
          date_trunc(${granularity}, profiles_portfolio_posts.created_at) AS period
        FROM profiles_portfolio_posts
      ),
      posts_by_period AS (
        SELECT
          count(*) AS posts,
          period
        FROM posts_with_period
        GROUP BY period
      )
      SELECT * FROM posts_by_period
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
