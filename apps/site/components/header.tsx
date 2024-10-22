import * as React from 'react';

import { auth } from 'auth';
import { UserMenu } from 'components/user-menu';
import { LoginButton } from './login-button';
import { Navigation } from './navigation';
import Link from 'next/link';
import Logo from './logo';

async function UserOrLogin() {
  const session = await auth();

  return (
    <>
      <div className="flex lg:w-40 md:w-auto items-center justify-end">
        {session?.user ? <UserMenu user={session.user} /> : <LoginButton />}
      </div>
    </>
  );
}

export async function Header() {
  return (
    <header className="fixed bottom-0 md:sticky md:bottom-[none] md:top-0 inset-x-0 z-30 flex items-center justify-between w-full h-16 px-4 md:px-6 lg:px-8 border-t md:border-t-0 md:border-b border-sunken shrink-0 bg-background backdrop-blur-xl">
      <nav className="flex w-full justify-between items-center h-16">
        <div className="flex w-full items-center justify-between space-x-3 lg:space-x-6">
          <Link
            href="/"
            className="hidden sm:flex lg:w-40 md:w-auto items-center text-xl pt-px text-muted hover:text-purple font-bold"
          >
            <Logo />
            <span className="font-header hidden md:inline-block mt-0.5">
              Scrapbook
            </span>
          </Link>
          <Navigation />
          <React.Suspense fallback={<div className=" overflow-auto" />}>
            <UserOrLogin />
          </React.Suspense>
        </div>
      </nav>
    </header>
  );
}
