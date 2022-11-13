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
        <title>KISK Portfolios</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body className="bg-neutral-100 px-6 sm:px-8">
        <header>
          <nav className="flex w-full justify-between items-center h-16">
            <Link
              className="flex text-base text-amber-500 hover:text-amber-700 font-semibold"
              href="/"
            >
              KISK portfolios
            </Link>{' '}
            <div className="flex items-center space-x-8">
              <div className="text-gray-500 hover:text-gray-700 relative md:flex justify-center text-base font space-x-8">
                {/*<Link href="/">About</Link>*/}
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
