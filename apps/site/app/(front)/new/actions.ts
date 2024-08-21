'use server';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Block } from '@blocknote/core';
import { auth } from 'auth';
import { db } from 'db';
import { posts } from 'db/schema/posts';
import { profilesToPosts } from 'db/schema/profiles-to-posts';
import { revalidatePath } from 'next/cache';

const client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export async function createPresignedUrlPUT(args: {
  bucket: string;
  key: string;
}) {
  const session = await auth();

  if (!session) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  }

  const { bucket, key } = args;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  const url = await getSignedUrl(client, command, { expiresIn: 3600 });
  console.log(url);
  return { url };
}

export async function createPresignedUrlGET(args: {
  bucket: string;
  key: string;
}) {
  const session = await auth();

  if (!session) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  }

  const { bucket, key } = args;
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  const url = await getSignedUrl(client, command, { expiresIn: 3600 });
  console.log(url);
  return { url };
}

export async function createNewPost(args: { blocks: Block[]; html: string }) {
  const session = await auth();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const uid = session.user.id;

  if (!args.blocks) {
    return {
      error: 'Invalid data?',
    };
  }

  const post = await db.transaction(async (tx) => {
    const result = await tx
      .insert(posts)
      .values({ blocks: args.blocks, html: args.html })
      .returning({ postId: posts.id });

    await tx
      .insert(profilesToPosts)
      .values({ profileId: uid, postId: result[0].postId });
    return result[0];
  });

  revalidatePath('/');
  revalidatePath(`/${session.user.username}`);

  return { postId: post.postId };
}
