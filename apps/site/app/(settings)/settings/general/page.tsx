import { auth } from 'auth';
import DeleteAccount from 'components/setting-delete-account';
import { redirect } from 'next/navigation';

export default async function IndexPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }
  return (
    <div className="space-y-8">
      <DeleteAccount />
    </div>
  );
}
