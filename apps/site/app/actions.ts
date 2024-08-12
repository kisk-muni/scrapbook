'use server';
import { auth } from 'auth';
import { db } from 'db';
import { profiles, accounts } from 'db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteAccount() {
  const session = await auth();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const uid = session.user.id;

  if (uid !== session?.user?.id) {
    return {
      error: 'Unauthorized',
    };
  }

  await db.delete(accounts).where(eq(accounts.userId, uid));
  await db
    .update(profiles)
    .set({ name: 'deleted', email: '', image: null })
    .where(eq(profiles.id, uid));

  revalidatePath('/');
  return redirect('/');
}

export async function updateUsername(args: { username: string }) {
  const session = await auth();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const uid = session.user.id;

  if (!args.username || !args.username.trim() || args.username.length > 32) {
    return {
      error: 'Invalid name',
    };
  }

  const result = await db
    .update(profiles)
    .set({ username: args.username })
    .where(eq(profiles.id, uid))
    .returning();

  return result[0];
}

export async function updateFullName(args: { fullName: string }) {
  const session = await auth();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const uid = session.user.id;

  if (!args.fullName || !args.fullName.trim() || args.fullName.length > 32) {
    return {
      error: 'Invalid name',
    };
  }

  const result = await db
    .update(profiles)
    .set({ fullName: args.fullName })
    .where(eq(profiles.id, uid))
    .returning();

  return result[0];
}

export async function updateBio(args: { bio: string }) {
  const session = await auth();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const uid = session.user.id;

  if (uid !== session?.user?.id) {
    return {
      error: 'Unauthorized',
    };
  }

  if (!args.bio || !args.bio.trim() || args.bio.length > 180) {
    return {
      error: 'Invalid name',
    };
  }

  const result = await db
    .update(profiles)
    .set({ bio: args.bio })
    .where(eq(profiles.id, uid))
    .returning();

  revalidatePath(`/${session.user.username}`);
  revalidatePath(`/settings/profile`);

  return result[0];
}

export async function post(args: { post: string }) {
  const session = await auth();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const uid = session.user.id;

  if (uid !== session?.user?.id) {
    return {
      error: 'Unauthorized',
    };
  }

  if (!args.post || !args.post.trim() || args.post.length > 32) {
    return {
      error: 'Invalid name',
    };
  }

  return { post: args.post };
}
