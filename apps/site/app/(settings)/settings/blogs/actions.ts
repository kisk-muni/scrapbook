'use server';
import { auth } from 'auth';
import { db } from 'db';
import { portfolios } from 'db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { parse } from 'node-html-parser';

export async function addBlog(args: { url: string; feedUrl?: string }) {
  const session = await auth();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const uid = session.user.id;

  if (!args.url || !args.url.trim()) {
    return {
      error: 'Invalid',
    };
  }
  let urlObj: URL | null = null;
  let feedUrl: URL | null = null;
  let foundFeedUrl: string | null = null;
  try {
    urlObj = new URL(args.url);
  } catch (error) {
    return {
      error:
        'URL adresa je neplatná. Zkontrolujte zda je v celém tvaru, včetně https:// jako v adresovém řádku prohlížeče.',
    };
  }
  let rssUrls: string[] = [];
  if (!args.feedUrl) {
    const urlRes = await fetch(urlObj);
    if (!urlRes.ok) {
      return { error: 'Na adrese jsme nenašli žádnou stránku.' };
    }

    const html = parse(await urlRes.text());
    rssUrls = html
      .querySelectorAll('link[rel="alternate"][type="application/rss+xml"]')
      .map((link) => link.getAttribute('href'));
    // assume the right link url is the shortest one
    if (rssUrls.length > 0) {
      foundFeedUrl = rssUrls.reduce((a, b) => {
        return a.length < b.length ? a : b;
      });
    }
  }

  if (!args.feedUrl && foundFeedUrl) {
    feedUrl = new URL(foundFeedUrl);
  } else if (args.feedUrl) {
    feedUrl = new URL(args.feedUrl);
  }

  if (feedUrl) {
    const foundFeedRes = await fetch(feedUrl);
    if (!foundFeedRes.ok) {
      console.error(`Portfolio feed fetch failed: ${feedUrl.toString()}}`);
      /*     return {
      error: 'Připojení portfolia se nezdařilo.',
    }; */
    }
  }

  const result = await db
    .insert(portfolios)
    .values({
      url: urlObj.toString(),
      feedUrl: feedUrl ? feedUrl.toString() : null,
      profileId: uid,
    })
    .returning();

  revalidatePath('/settings/blogs');

  return result[0];
}

export async function updateBlog(args: {
  id: string;
  url: string;
  feedUrl: string;
}) {
  const session = await auth();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const uid = session.user.id;

  if (
    !args.id ||
    !args.url ||
    !args.url.trim() ||
    !args.feedUrl ||
    !args.feedUrl.trim()
  ) {
    return {
      error: 'Invalid',
    };
  }

  const result = await db
    .update(portfolios)
    .set({ url: args.url, feedUrl: args.feedUrl })
    .where(and(eq(portfolios.profileId, uid), eq(portfolios.id, args.id)))
    .returning();

  revalidatePath('/settings/blogs');

  return result[0];
}

export async function deleteBlog(args: { id: string }) {
  const session = await auth();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const uid = session.user.id;

  if (!args.id) {
    return {
      error: 'Invalid',
    };
  }

  const result = await db
    .delete(portfolios)
    .where(and(eq(portfolios.profileId, uid), eq(portfolios.id, args.id)))
    .returning();

  revalidatePath('/settings/blogs');

  return result[0];
}

export async function syncBlogFeed(args: { id: string }) {
  const session = await auth();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const uid = session.user.id;

  if (!args.id) {
    return {
      error: 'Invalid',
    };
  }

  const result = await db.query.portfolios.findFirst({
    where: (portfolios, { eq }) => eq(portfolios.profileId, uid),
  });

  if (!result) {
    return {
      error: 'Not allowed',
    };
  }

  const res = await db.execute(
    sql`select sync_single_portfolio_posts(${args.id})`
  );

  console.log('res', res);

  revalidatePath('/settings/blogs');

  return result[0];
}
