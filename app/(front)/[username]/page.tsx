'use client';
import { ErrorBoundary } from 'react-error-boundary';
import { Profile } from './profile';

export default function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  return (
    <div className="mx-auto sm:max-w-8xl mt-6 mb-8 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-20">
      <ErrorBoundary fallback={<div>Profil se nepodařilo načíst.</div>}>
        <Profile userName={username} />
      </ErrorBoundary>
    </div>
  );
}
