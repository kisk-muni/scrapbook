import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-2 text-lg font-semibold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-2 text-sm font-semibold">{children}</h2>
    ),
    p: ({ children }) => (
      <p className="mb-3 leading-normal text-muted-foreground">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 pl-4 -mt-2 list-disc list-inside">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="mb-1 pl-3 leading-normal text-muted-foreground">
        {children}
      </li>
    ),
    a: ({ ...props }) => (
      <a className="text-foreground hover:underline" {...props} />
    ),
    ...components,
  };
}
