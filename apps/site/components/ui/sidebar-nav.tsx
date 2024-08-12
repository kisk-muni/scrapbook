'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from './button-radix';
import { IconArrowRight } from './icons';
import classNames from 'classnames';

type NavItem = {
  title: string;
  href: string;
};

export function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <div className="h-full shrink-0 w-auto min-w-[160px] md:max-w-[200px] md:flex mt-10 flex-col items-start fixed md:sticky top-[64px] z-10 hidden">
      <ul className="block w-full">
        {items.map(({ title, href }, i) => (
          <li key={i} className="mb-1">
            <Link
              className={classNames(
                buttonVariants({ variant: 'ghost' }),
                'group w-full px-4 transition-colors  hover:bg-sheet/60',
                href === pathname && 'bg-sheet font-medium'
              )}
              href={href}
            >
              {href == '/' && (
                <IconArrowRight className="size-4 mr-2 rotate-180" />
              )}
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
