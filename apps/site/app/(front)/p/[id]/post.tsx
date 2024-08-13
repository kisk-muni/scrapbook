import { db } from 'db';
import { cache } from 'react';

const loadPost = cache(async (id: string) => {
  const post = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),
  });
  return post;
});

export async function Post(props: { id?: string }) {
  const post = await loadPost(props.id);
  if (!post) return null;
  return null;
}
