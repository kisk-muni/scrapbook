import { auth } from 'auth';
import NameSetting from 'components/setting-name';
import { redirect } from 'next/navigation';
import { updateUsername, updateFullName, updateBio } from 'app/actions';
import { db } from 'db';
import UsernameSetting from 'components/setting-username';
import BioSetting from 'components/setting-bio';

export default async function IndexPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }
  const user = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, session.user.id),
  });
  return (
    <div className="space-y-8">
      <NameSetting
        defaultName={user?.fullName || ''}
        updateFullName={updateFullName}
      />
      <BioSetting defaultName={user?.bio || ''} updateBio={updateBio} />
      <UsernameSetting
        defaultName={user?.username || ''}
        updateUserName={updateUsername}
      />
    </div>
  );
}
