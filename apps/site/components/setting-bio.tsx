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

export default function BioSettingCard({
  defaultName,
  updateBio,
}: {
  defaultName: string;
  updateBio: (args: { bio: string }) => ServerActionResult<Profile>;
}) {
  const maxLength = 180;
  const { formRef, onKeyDown } = useEnterSubmit();
  const ref = useRef<HTMLInputElement>(null);
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [value, setValue] = useState(defaultName);
  const notValid = (value: string) =>
    !value.trim() || value.trim().length > maxLength;

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
            const result = await updateBio({
              bio: ref.current?.value,
            });
            if (result && 'error' in result) {
              toast.error(result.error);
              return;
            }
            toast.success('Popisek profilu byl úspěšně uložen');
          });
        }}
      >
        <SettingHeader>
          <SettingHeadline>O mně</SettingHeadline>
          <SettingDescription>
            Zadejte krátký popisek o sobě, který bude zobrazen na vašem profilu.
          </SettingDescription>
          <SettingCardContent>
            <div className="flex space-x-1.5 items-center">
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
            </div>
          </SettingCardContent>
        </SettingHeader>
        <SettingFooter>
          <SettingFooterDescription>
            Přezdívka může mít maximálně {maxLength} znaků.
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
