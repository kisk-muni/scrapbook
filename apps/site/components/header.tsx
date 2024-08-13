import * as React from 'react';

import { auth } from 'auth';
import { UserMenu } from 'components/user-menu';
import { LoginButton } from './login-button';
import { Navigation } from './navigation';

async function UserOrLogin() {
  const session = await auth();

  return (
    <>
      <div className="flex items-center">
        {session?.user ? <UserMenu user={session.user} /> : <LoginButton />}
      </div>
    </>
  );
}

export async function Header() {
  return (
    <header className="fixed bottom-0 md:sticky md:bottom-[none] md:top-0 inset-x-0 z-30 flex items-center justify-between w-full h-16 px-4 md:px-6 lg:px-8 border-b border-sunken shrink-0 bg-background backdrop-blur-xl">
      <nav className="flex w-full justify-between items-center h-16">
        <Navigation />
        <div className="flex items-center">
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            <UserOrLogin />
          </React.Suspense>
        </div>
      </nav>
    </header>
  );
}
