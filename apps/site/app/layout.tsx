import { Providers } from './providers';
import '@blocknote/mantine/style.css';
import '../styles/globals.css';
import { TailwindIndicator } from 'components/tailwind-indicator';
import { Header } from 'components/header';
import { Toaster } from 'react-hot-toast';
import { auth } from 'auth';
import { Fragment } from 'react';

export default async function RootLayout({
  children,
  initialsetup,
}: {
  children: React.ReactNode;
  initialsetup: React.ReactNode;
}) {
  const session = await auth();
  const isLogged = !!session;
  const isProfileComplete = session?.user.username && session.user.fullName;
  return (
    <html>
      <head>
        <title>KISK Scrapbook</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f37a28" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#da532c" />
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen bg-background">
            {isLogged && !isProfileComplete ? (
              initialsetup
            ) : (
              <Fragment>
                <Header />
                <main className="px-4 md:px-6 lg:px-8">{children}</main>
              </Fragment>
            )}
            <Toaster />
          </div>
        </Providers>
        <TailwindIndicator />
      </body>
    </html>
  );
}
