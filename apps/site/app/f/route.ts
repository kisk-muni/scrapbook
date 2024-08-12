import { NextRequest } from 'next/server';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { redirect } from 'next/navigation';

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

// `/f?key=${key}`
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const hasKey = searchParams.has('key');
  const key = hasKey ? searchParams.get('key') : null;
  if (!key) throw new Error('Key not set.');

  const command = new GetObjectCommand({
    Bucket: 'scrapbook-so',
    Key: key,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  redirect(url);
}
