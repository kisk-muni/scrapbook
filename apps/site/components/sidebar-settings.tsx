'use client';
import { SidebarNav } from './ui/sidebar-nav';

const documents = [
  {
    title: 'Profil',
    href: '/settings/profile',
  },
  { title: 'Obecné', href: '/settings/general' },
];

export function SidebarSettings() {
  return <SidebarNav items={documents} />;
}
