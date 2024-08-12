import {
  SettingCard,
  SettingDescription,
  SettingFooter,
  SettingHeader,
  SettingHeadline,
} from './ui/settings-card';
import { AccountDeleteDialog } from 'components/account-delete-dialog';
import { auth } from 'auth';
import { deleteAccount } from 'app/actions';

export default async function DeleteAccount() {
  const session = await auth();
  const user = session?.user;
  return (
    <>
      <SettingCard>
        <SettingHeader destructive>
          <SettingHeadline>Odstranění účtu</SettingHeadline>
          <SettingDescription>
            Trvalé odstranění osobního účtu a veškerého jeho obsahu z platformy.
            Tuto akci nelze vrátit zpět, proto pokračujte s rozmyslem.
          </SettingDescription>
        </SettingHeader>
        <SettingFooter destructive>
          {user?.email && user.name && (
            <AccountDeleteDialog
              email={user.email}
              name={user.name}
              deleteAccount={deleteAccount}
            />
          )}
        </SettingFooter>
      </SettingCard>
    </>
  );
}
