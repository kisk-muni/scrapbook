'use client';
import { SidebarNav } from './ui/sidebar-nav';

const documents = [
  { title: 'Soukromí a nakládání s daty', href: '/privacy' },
  {
    title: 'Podmínky využívání služby',
    href: '/terms',
  },
];

export function SidebarDocs() {
  return <SidebarNav items={documents} />;
}
