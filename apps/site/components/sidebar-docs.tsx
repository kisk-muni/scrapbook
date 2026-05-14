'use client';
import { SidebarNav } from './ui/sidebar-nav';

const documents = [
  {
    sectionTitle: 'Úvod',
    pages: [
      { title: 'Jak začít se Scrapbookem', href: '/start' },
      { title: 'O scrapbooku', href: '/about' },
    ],
  },
  {
    sectionTitle: 'Právní dokumenty',
    pages: [
      { title: 'Soukromí a nakládání s daty', href: '/privacy' },
      {
        title: 'Podmínky využívání služby',
        href: '/terms',
      },
    ],
  },
];

export function SidebarDocs() {
  return <SidebarNav items={documents} />;
}
