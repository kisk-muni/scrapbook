'use server';

import { db } from 'db';
import { sql } from 'drizzle-orm';
import {
  posts,
  profilesToPosts,
  profiles,
  portfolioPosts,
  portfolios,
} from 'db/schema';

export type UniversalPost = {
  id: string;
  publishedAt: Date;
  description: string | null;
  type: 'native' | 'portfolio';
  thumbnailUrl?: string | null;
  html: string | null;
  url: string | null;
  title: string | null;
  profile: {
    id: string;
    fullName: string | null;
    username: string;
    image: string | null;
  };
};

const FETCH_POSTS_LIMIT = 30;

export default async function getPosts({
  pageParam = 0,
}: {
  pageParam: unknown;
}) {
  const offset = (pageParam as any) || 0;
  console.log('offset:', offset);

  const results = await db.execute(sql`
    (
      SELECT
        p.id,
        p.published_at as "publishedAt",
        p.description,
        p.html,
        'native' as type,
        pr.id as "profileId",
        pr.full_name as "fullName",
        pr.username,
        pr.image,
        NULL::text as title,
        NULL::text as url,
        NULL::text as thumbnail_url
      FROM ${posts} p
      INNER JOIN ${profilesToPosts} ptp ON p.id = ptp.post_id
      INNER JOIN ${profiles} pr ON ptp.profile_id = pr.id
      WHERE pr.is_public = true
    )
    UNION ALL
    (
      SELECT
        pp.id,
        pp.published_at as "publishedAt",
        pp.description,
        NULL::text as html,
        'portfolio' as type,
        pr.id as "profileId",
        pr.full_name as "fullName",
        pr.username,
        pr.image,
        pp.title,
        pp.url,
        pp.thumbnail_url
      FROM ${portfolioPosts} pp
      INNER JOIN ${portfolios} po ON pp.portfolio_id = po.id
      INNER JOIN ${profiles} pr ON po.profile_id = pr.id
      WHERE pr.is_public = true
    )
    ORDER BY "publishedAt" DESC
    LIMIT ${FETCH_POSTS_LIMIT}
    OFFSET ${offset}
  `);

  const allPosts = results.map((row: any) => ({
    id: row.id,
    publishedAt: row.publishedAt,
    description: row.description,
    type: row.type,
    thumbnailUrl: row.thumbnail_url || undefined,
    html: row.html,
    url: row.url,
    title: row.title,
    profile: {
      id: row.profileId,
      fullName: row.fullName,
      username: row.username,
      image: row.image,
    },
  })) as UniversalPost[];

  return allPosts;
}
