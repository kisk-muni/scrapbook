import { Interweave, Node } from 'interweave';
import { PostImage } from './post-image';
import Link from 'next/link';

interface PostDescriptionProps {
  content: string;
}

function transform(node: HTMLElement, children: Node[]): React.ReactNode {
  if (node.tagName === 'a') {
    return <Link href={node.getAttribute('href')}>{children}</Link>;
  }
  if (node.tagName === 'img') {
    return (
      <PostImage
        src={node.getAttribute('src')}
        alt={node.getAttribute('alt')}
      />
    );
  }
}

export function PostDescription({ content }: PostDescriptionProps) {
  return (
    <Interweave
      className="text-lg text-text text-ellipsis overflow-hidden leading-6 line-clamp-8"
      content={content.split('<a class="more-link"')[0]}
      transform={transform}
    />
  );
}
