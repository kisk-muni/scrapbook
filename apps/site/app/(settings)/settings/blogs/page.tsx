import { auth } from 'auth';
import SettingBlog from './setting-blogs';
import { redirect } from 'next/navigation';

export default async function IndexPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }
  return (
    <div className="space-y-8">
      <SettingBlog />
    </div>
  );
}
