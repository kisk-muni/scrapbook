'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from 'components/logo';
import { Fragment } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Fragment>
      <header>
        <nav className="flex w-full justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              className="text-xl pt-px flex items-center text-muted hover:text-purple font-bold"
              href="/"
            >
              <Logo />
              {pathname != '/' && (
                <span className="font-header mt-0.5">
                  Scrapbook {'/analytics' == pathname ? 'Analytics' : ''}
                </span>
              )}
            </Link>
          </div>
          <div className="flex items-baseline space-x-6">
            {pathname != '/' && (
              <Link
                className="text-muted hover:text-purple hover:text-gray relative md:flex justify-center text-base font space-x-6"
                href="/"
              >
                Příspěvky studentů
              </Link>
            )}
            <Link
              className="text-muted hover:text-purple hover:text-gray relative md:flex justify-center text-base font space-x-6"
              href="/students"
            >
              Studenti
            </Link>
            <Link
              className="text-muted hover:text-purple hover:text-gray relative md:flex justify-center text-base font space-x-6"
              href="/analytics/posts"
            >
              Analytika
            </Link>
            <Link
              className="text-muted hover:text-purple hover:text-gray relative md:flex justify-center text-base font space-x-6"
              href="/about"
            >
              O Scrapbooku
            </Link>
            {['/', '/about'].includes(pathname as string) && (
              <Link
                className="bg-muted hidden sm:inline text-background hover:bg-purple rounded-full font-semibold px-4 pt-1 pb-0.5 uppercase relative md:flex justify-center text-base font"
                href="/add-portfolio"
              >
                Připojit portfolio
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </Fragment>
  );
}
