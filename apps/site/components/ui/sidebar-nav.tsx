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

export function SidebarNav({
  items,
}: {
  items: { sectionTitle?: string; pages: NavItem[] }[];
}) {
  const pathname = usePathname();
  return (
    <div className="h-full shrink-0 w-auto min-w-[180px] md:max-w-[230px] md:flex mt-10 flex-col items-start fixed md:sticky top-[64px] z-10 hidden">
      {items.map((section, sectionIdx) => (
        <>
          {section.sectionTitle && (
            <span className="text-muted px-4 py-1.5">
              {section.sectionTitle}
            </span>
          )}
          <ul key={sectionIdx} className="block w-full mb-8">
            {section.pages.map((item, itemIdx) => {
              return (
                <li key={itemIdx} className="mb-1">
                  <Link
                    className={classNames(
                      buttonVariants({ variant: 'ghost', justify: 'start' }),
                      'group w-full px-4 transition-colors hover:bg-sheet/60 items-start',
                      item.href === pathname && 'bg-sheet font-medium'
                    )}
                    href={item.href}
                  >
                    {item.href == '/' && (
                      <IconArrowRight className="size-4 mr-2 rotate-180" />
                    )}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ))}
    </div>
  );
}
