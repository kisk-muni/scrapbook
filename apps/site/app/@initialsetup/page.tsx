'use client';
import { updateFullName, updateUsername } from 'app/actions';
import InitialSetupFullName from 'components/initial-setup-fullname';
import InitialSetupUsername from 'components/initial-setup-username';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CompleteProfilePage() {
  const { data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (data?.user?.username && data?.user?.fullName) {
      router.refresh();
    }
  }, [data?.user]);
  return (
    <main className="mx-auto sm:max-w-3xl mt-6 mb-8 sm:mt-6 px-6 sm:mb-16 sm:px-6 md:mt-20 md:mb-20 space-y-8">
      <div>
        {!data?.user?.username ? (
          <InitialSetupUsername
            defaultName={''}
            updateUserName={updateUsername}
          />
        ) : (
          !data?.user?.fullName && (
            <InitialSetupFullName
              defaultName={''}
              updateFullName={updateFullName}
            />
          )
        )}
      </div>
    </main>
  );
}
