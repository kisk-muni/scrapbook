import { Interweave, Node } from 'interweave';
import { PostImage } from './post-image';
import Link from 'next/link';
import { useMDXComponents } from 'mdx-components';

interface PostDescriptionProps {
  content: string;
}

function transform(node: HTMLElement, children: Node[]): React.ReactNode {
  if (node.tagName === 'A') {
    return <Link href={node.getAttribute('href')}>{children}</Link>;
  }
  if (node.tagName === 'IMG') {
    const src = node.getAttribute('src');
    return (
      <PostImage
        local
        src={src.startsWith('s3:') ? `/f?key=${src.split('/', 4)[3]}` : src}
        alt={node.getAttribute('alt')}
      />
    );
  }
  console.log(node.tagName);
  if (node.tagName === 'H1') {
    return (
      <h1 className="text-text text-2xl leading-5 font-semibold">{children}</h1>
    );
  }
  if (node.tagName === 'H2') {
    return <h2 className="mb-2 text-xl font-semibold">{children}</h2>;
  }
  if (node.tagName === 'H3') {
    return <h3 className="mb-2 text-lg font-semibold">{children}</h3>;
  }
  if (node.tagName === 'P') {
    return (
      <p className="mb-3 leading-normal text-muted-foreground">{children}</p>
    );
  }
  if (node.tagName === 'OL') {
    return <ol className="mb-2 pl-4 mt-2 list-decimal">{children}</ol>;
  }
  if (node.tagName === 'UL') {
    return (
      <ul className="mb-4 pl-4 -mt-2 list-disc list-inside">{children}</ul>
    );
  }
  if (node.tagName === 'LI') {
    return (
      <li className="mb-0 pl-3 leading-normal text-muted-foreground">
        {children}
      </li>
    );
  }
}

export function PostDescription({ content }: PostDescriptionProps) {
  return (
    <Interweave
      className="text-lg text-text text-ellipsis overflow-hidden leading-6 line-clamp-8"
      content={content.split(/<!-- \/wp:paragraph -->|<a class="more-link"/)[0]}
      transform={transform}
    />
  );
}
