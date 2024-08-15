import { updateFullName, updateUsername } from 'app/actions';
import { auth } from 'auth';
import NameSettingCard from 'components/setting-name';
import UsernameSettingCard from 'components/setting-username';
import {
  SettingCard,
  SettingCardContent,
  SettingHeader,
} from 'components/ui/settings-card';
import { db } from 'db';
import { redirect } from 'next/navigation';

export default async function CompleteProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }
  const user = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, session.user.id),
  });
  return (
    <main className="mx-auto sm:max-w-7xl mt-6 mb-8 sm:mt-6 sm:mb-16 sm:px-6 md:mt-20 md:mb-20 space-y-8">
      <SettingCard>
        <SettingHeader>
          <h1 className="text-4xl mb-2 tracking-tight text-transparent bg-gradient-header from-purple to-orange bg-clip-text pr-2 font-header md:text-5xl lg:text-6xl">
            Vítejte na Scrapbooku
          </h1>
          <p className="text-lg lg:text-2xl text-text leading-8 mx-auto mb-4">
            Pro pokračování potřebujeme ještě několik informací.
          </p>
        </SettingHeader>
        <SettingCardContent>
          <UsernameSettingCard
            defaultName={user?.username || ''}
            updateUserName={updateUsername}
          />
        </SettingCardContent>
      </SettingCard>
    </main>
  );
}
