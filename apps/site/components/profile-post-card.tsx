'use client';
import { cs } from 'date-fns/locale';
import { PostImage } from 'components/post-image';
import { PostDescription } from 'components/post-description';
import Link from 'next/link';
import { UniversalPost } from 'lib/actions/get-posts';
import { format } from 'date-fns';

interface CardProps {
  index?: number;
  data: UniversalPost;
  width?: number;
}

export function ProfilePostCard(props: CardProps) {
  const data = props.data;
  const publishedAt = data.publishedAt;
  return (
    <div className="bg-white p-4 sm:p-6">
      {publishedAt && (
        <p className="text-muted font-bold mb-2">
          {format(data.publishedAt, 'do MMMM yyyy', {
            locale: cs,
          })}
        </p>
      )}
      {data.title && data?.url && (
        <p className="mb-3 text-xl leading-5 font-semibold">
          <Link href={data?.url} className="text-text hover:text-blue">
            {data?.title}
          </Link>
        </p>
      )}
      {data?.description && (
        <p className="text-lg text-text leading-6">
          <PostDescription content={data.description} />
        </p>
      )}
      {data?.html && (
        <p className="text-lg text-text leading-6">
          <PostDescription content={data.html} />
        </p>
      )}
      {data?.thumbnailUrl && (
        <PostImage alt={data.title} src={data?.thumbnailUrl} isThumbnail />
      )}
    </div>
  );
}
