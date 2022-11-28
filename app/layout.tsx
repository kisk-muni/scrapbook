'use client';
import Link from 'next/link';
import { Providers } from './providers';
import '../styles/globals.css';
import { usePathname } from 'next/navigation';
import { TailwindIndicator } from 'components/tailwind-indicator';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html>
      <head>
        <title>KISK Scrapbook</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body className="bg-background px-4 md:px-6 lg:px-8">
        <header>
          <nav className="flex w-full justify-between items-center h-16">
            <Link
              className="flex justify-center text-base text-muted hover:text-cyan font-semibold"
              href="/"
            >
              KISK Scrapbook
            </Link>{' '}
            <div className="flex items-baseline space-x-6">
              <Link
                className="text-muted hover:text-cyan hover:text-gray relative md:flex justify-center text-base font space-x-6"
                href="/about"
              >
                O Scrapbooku
              </Link>
              <Link
                className="text-muted hover:text-cyan hover:text-gray relative md:flex justify-center text-base font space-x-6"
                href="/students"
              >
                Studenti
              </Link>
              {['/', '/about'].includes(pathname) && (
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
        <main>
          <Providers>{children}</Providers>
          <TailwindIndicator />
        </main>
      </body>
    </html>
  );
}
