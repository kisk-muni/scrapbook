'use client';
import { SidebarNav } from './ui/sidebar-nav';

const documents = [
  {
    title: 'Profil',
    href: '/settings/profile',
  },
  { title: 'Externí blog', href: '/settings/blogs' },
  { title: 'Obecné', href: '/settings/general' },
];

export function SidebarSettings() {
  return <SidebarNav items={documents} />;
}
