'use client';
import { useRef, useState, useTransition } from 'react';
import { Button } from 'components/ui/button-radix';
import { Input } from 'components/ui/input-radix';
import {
  SettingCard,
  SettingCardContent,
  SettingDescription,
  SettingFooter,
  SettingFooterDescription,
  SettingHeader,
  SettingHeadline,
} from 'components/ui/settings-card';
import { IconSpinner } from './ui/icons';
import { useEnterSubmit } from 'lib/hooks/use-enter-submit';
import toast from 'react-hot-toast';
import { ServerActionResult } from 'lib/types';
import { Profile } from 'db/schema';

export default function NameSettingCard({
  defaultName,
  updateFullName,
}: {
  defaultName: string;
  updateFullName: (args: { fullName: string }) => ServerActionResult<Profile>;
}) {
  const maxLength = 32;
  const { formRef, onKeyDown } = useEnterSubmit();
  const ref = useRef<HTMLInputElement>(null);
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [value, setValue] = useState(defaultName);
  const notValid = (value: string) =>
    !value.trim() ||
    value.trim().length > maxLength ||
    value.trim() === defaultName;

  return (
    <SettingCard>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          startSubmitTransition(async () => {
            if (notValid(value)) return;
            console.log('submitting', ref.current?.value);
            const result = await updateFullName({
              fullName: ref.current?.value,
            });
            if (result && 'error' in result) {
              toast.error(result.error);
              return;
            }
            toast.success('Jméno bylo úspěšně uloženo');
          });
        }}
      >
        <SettingHeader>
          <SettingHeadline>Vaše jméno</SettingHeadline>
          <SettingDescription>
            Prosím zadejte vaše jméno, které bude zobrazeno na vašem profilu.
          </SettingDescription>
          <SettingCardContent>
            <Input
              ref={ref}
              type="text"
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={onKeyDown}
              defaultValue={defaultName}
              className="max-w-80"
            />
          </SettingCardContent>
        </SettingHeader>
        <SettingFooter>
          <SettingFooterDescription>
            Jméno může mít maximálně {maxLength} znaků.
          </SettingFooterDescription>
          <Button
            variant="secondary"
            disabled={notValid(value) || isSubmitPending}
            type="submit"
          >
            {isSubmitPending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                Ukládání...
              </>
            ) : (
              <>Uložit</>
            )}
          </Button>
        </SettingFooter>
      </form>
    </SettingCard>
  );
}
