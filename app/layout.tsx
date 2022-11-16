'use client';
import Link from 'next/link';
import { Providers } from './providers';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              className="flex justify-center text-base text-slate hover:text-darker font-semibold"
              href="/"
            >
              KISK Scrapbook
            </Link>{' '}
            <div className="flex items-center space-x-8">
              <div className="text-slate hover:text-gray relative md:flex justify-center text-base font space-x-8">
                <Link href="/about">O Scrapbooku</Link>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
