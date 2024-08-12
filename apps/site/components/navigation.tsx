'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from 'components/logo';
import { ChevronRightIcon } from '@radix-ui/react-icons';

export function Navigation() {
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center">
        <Link
          href="/"
          className="text-xl pt-px flex items-center text-muted hover:text-purple font-bol"
        >
          <Logo />
          {pathname != '/' && (
            <span className="font-header mt-0.5">Scrapbook</span>
          )}
        </Link>
        {pathname.match('/analytics') && (
          <>
            <ChevronRightIcon className="w-6 h-6 text-muted mx-1" />
            <Link
              className="text-xl pt-px flex items-center text-muted hover:text-purple font-bold"
              href="/analytics/posts"
            >
              <span className="font-header mt-0.5">Analytics</span>
            </Link>
          </>
        )}
      </div>
      <div className="flex items-baseline space-x-6 ml-auto mr-8">
        {pathname != '/' && (
          <Link
            className="text-muted hover:text-purple hover:text-gray relative md:flex justify-center text-base font space-x-6"
            href="/"
          >
            Nejnovější příspěvky
          </Link>
        )}
        {pathname != '/students' && (
          <Link
            className="text-muted hover:text-purple hover:text-gray relative md:flex justify-center text-base font space-x-6"
            href="/students"
          >
            Studenti
          </Link>
        )}
        <Link
          className="text-muted hover:text-purple hover:text-gray relative md:flex justify-center text-base font space-x-6"
          href="/about"
        >
          O Scrapbooku
        </Link>
      </div>
    </>
  );
}
