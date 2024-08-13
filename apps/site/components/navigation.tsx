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

const navigation = [
  { href: '/', label: 'Domů', icon: IconHouse },
  { href: '/students', label: 'Studenti', icon: IconUsersThree },
  { href: '/analytics/posts', label: 'Analytika', icon: IconChartPie },
  { href: '/about', label: 'O Scrapbooku', icon: IconQuestion },
];

export function Navigation() {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden sm:flex items-center">
        <Link
          href="/"
          className="text-xl pt-px flex items-center text-muted hover:text-purple font-bold"
        >
          <Logo />
          <span className="font-header hidden md:inline-block mt-0.5">
            Scrapbook
          </span>
        </Link>
      </div>
      <div className="flex grow items-baseline justify-center space-x-3 lg:space-x-6 mx-auto mr-8">
        {navigation.map((item: any) => (
          <Button asChild variant="ghost" key={item.href}>
            <Link
              href={item.href}
              className={classNames(
                'text-muted hover:text-slate hover:text-gray relative md:flex justify-center text-base font',
                {
                  'bg-white text-text hover:bg-white': pathname === item.href,
                }
              )}
            >
              <item.icon className="h-5 w-5 md:mr-1 -mt-0.5" />{' '}
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </>
  );
}
