'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from 'components/logo';
import {
  IconChartPie,
  IconHouse,
  IconQuestion,
  IconUsersThree,
} from './ui/icons';
import { Button } from './ui/button-radix';
import classNames from 'classnames';
import { Fragment } from 'react';

const navigation = [
  { href: '/', label: 'Domů', classNames: '', icon: IconHouse },
  { href: '/students', label: 'Studenti', icon: IconUsersThree },
  {
    href: '/analytics/posts',
    label: 'Analytika',
    classNames: 'hidden md:flex',
    icon: IconChartPie,
  },
  {
    href: '/about',
    classNames: '',
    label: 'O Scrapbooku',
    icon: IconQuestion,
  },
];

export function Navigation() {
  const pathname = usePathname();
  return (
    <div className="flex justify-between w-full max-w-4xl">
      {navigation.map((item: any) => (
        <Button asChild variant="ghost" key={item.href}>
          <Link
            href={item.href}
            className={classNames(
              'text-muted hover:text-slate hover:text-gray rounded-xl relative md:flex justify-center text-base font',
              {
                'bg-white text-text hover:bg-white': pathname === item.href,
              },
              item?.classNames
            )}
          >
            <item.icon className="h-5 w-5 md:mr-1 -mt-0.5" />{' '}
            <span className="hidden md:inline">{item.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}
