import { auth } from 'auth';
import { LoginButton } from 'components/login-button';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  // redirect to home if user is already logged in
  const session = await auth();

  if (session?.user) return null;

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <LoginButton />
    </div>
  );
}
