'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CompleteProfilePage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const router = useRouter();
  if (!session) {
    router.push('/');
  }
  return (
    <main className="mx-auto sm:max-w-3xl mt-6 mb-8 sm:mt-6 px-6 sm:mb-16 sm:px-6 md:mt-20 md:mb-20 space-y-8">
      {children}
    </main>
  );
}
