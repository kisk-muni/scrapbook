'use client';
import { useRef, useState, useTransition } from 'react';
import { Button } from 'components/ui/button-radix';
import { Input } from 'components/ui/input-radix';
import { IconSpinner } from './ui/icons';
import { useEnterSubmit } from 'lib/hooks/use-enter-submit';
import toast from 'react-hot-toast';
import { ServerActionResult } from 'lib/types';
import { Profile } from 'db/schema';
import { useSession } from 'next-auth/react';

export default function InitialSetupUsername({
  defaultName,
  updateUserName,
}: {
  defaultName: string;
  updateUserName: (args: { username: string }) => ServerActionResult<Profile>;
}) {
  const maxLength = 32;
  const { update, data } = useSession();
  const { formRef, onKeyDown } = useEnterSubmit();
  const ref = useRef<HTMLInputElement>(null);
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [value, setValue] = useState(defaultName);
  const notValid = (value: string) =>
    !value.trim() || value.trim().length > maxLength;

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          startSubmitTransition(async () => {
            if (notValid(value)) return;
            console.log('submitting', ref.current?.value);
            const result = await updateUserName({
              username: ref.current?.value,
            });
            if (result && 'error' in result) {
              toast.error(result.error);
              return;
            }
            await update({
              user: {
                ...data.user,
                username: ref.current?.value,
              },
            });
            toast.success('Přezdívka byla úspěšně uložena');
          });
        }}
      >
        <div className="mb-4">
          <div className="mb-4 text-lg lg:text-2xl text-muted text-center">
            1/2
          </div>
          <h1 className="text-4xl text-center mb-2 tracking-tight text-transparent bg-gradient-header from-purple to-orange bg-clip-text pr-2 font-header md:text-5xl lg:text-6xl">
            Vaše přezdívka
          </h1>
          <p className="text-lg lg:text-2xl text-center text-text leading-8 mx-auto">
            Prosím zadejte vaši unikátní přezdívku.
            <br />
            Přezdívka bude v adrese vašeho profilu.
          </p>
          <div className="mt-6 mb-6">
            <div className="flex space-x-1.5 items-center">
              <div className="text-lg lg:text-xl text-slate items-center flex bg-background border-border border-2 rounded-xl h-11 lg:h-14 px-3 tracking-wide">
                scrapbook.kisk.cz
              </div>
              <div className="text-lg lg:text-xl text-slate items-center flex bg-background border-border border-2 rounded-xl h-11 lg:h-14 px-3 tracking-wide">
                /
              </div>
              <Input
                ref={ref}
                type="text"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onKeyDown={onKeyDown}
                defaultValue={defaultName}
                autoFocus
                className="max-w-80 focus:bg-elevated bg-elevated text-lg px-3 h-11 lg:h-14"
              />
            </div>
          </div>
        </div>
        <div>
          <Button
            variant="secondary"
            disabled={notValid(value) || isSubmitPending}
            type="submit"
            size="lg"
            className="w-full lg:h-14"
          >
            {isSubmitPending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                Ukládání...
              </>
            ) : (
              <>Pokračovat</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
