'use client';

import { type DialogProps } from '@radix-ui/react-dialog';
import { toast } from 'react-hot-toast';

import { ServerActionResult } from 'lib/types';
import { Button } from 'components/ui/button-radix';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { IconSpinner } from 'components/ui/icons';
import { Input } from 'components/ui/input-radix';
import { Label } from 'components/ui/label-radix';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface AccountDeleteDialogProps extends DialogProps {
  deleteAccount: () => ServerActionResult<{ deleted: true }>;
  email: string;
  name: string;
}

export function AccountDeleteDialog({
  email,
  name,
  deleteAccount,
  ...props
}: AccountDeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [nameOrEmail, setNameOrEmail] = useState('');
  const [check, setCheck] = useState('');
  const [isDeletePending, startDeleteTransition] = useTransition();
  const checkSentence = 'trvale odstranit účet a data';
  const router = useRouter();

  useEffect(() => {
    setIsValid(
      (nameOrEmail === name || nameOrEmail === email) && check === checkSentence
    );
  }, [nameOrEmail, check, name, email]);

  useEffect(() => {
    if (!isOpen) {
      setNameOrEmail('');
      setCheck('');
    }
  }, [isOpen, nameOrEmail, check]);

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Odstranit účet
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Opravdu to chcete udělat?</DialogTitle>
            <DialogDescription>
              Odstranění účtu je nevratné, všechna data budou trvale smazána.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <div>
              <Label htmlFor="nameOrEmail">Zadejte své jméno nebo email</Label>
              <p className="leading-normal"></p>
              <Input
                name="nameOrEmail"
                value={nameOrEmail}
                onChange={(e) => setNameOrEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="check-sentence">
                Pro ověření napište <i>{checkSentence}</i> do políčka níže
              </Label>
              <Input
                name="check-sentence"
                value={check}
                onChange={(e) => setCheck(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              className="w-full"
              disabled={isDeletePending || !isValid}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                startDeleteTransition(async () => {
                  console.log('deleting account');
                  const result = await deleteAccount();

                  if (result && 'error' in result) {
                    toast.error(result.error);
                    return;
                  }
                  router.push('/');
                  toast.success('Účet byl úspěšně odstraněn');
                  signOut({ callbackUrl: '/' });
                });
              }}
            >
              {isDeletePending ? (
                <>
                  <IconSpinner className="mr-2 animate-spin" />
                  Odstraňování...
                </>
              ) : (
                <>Trvale odstranit účet</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
