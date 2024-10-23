'use client';
import { useState, useTransition } from 'react';
import { Button } from 'components/ui/button-radix';
import {
  SettingCard,
  SettingCardContent,
  SettingDescription,
  SettingFooter,
  SettingHeader,
  SettingHeadline,
} from 'components/ui/settings-card';
import { IconCheck, IconSpinner } from './ui/icons';
import toast from 'react-hot-toast';
import { ServerActionResult } from 'lib/types';
import { Profile } from 'db/schema';
import * as Checkbox from '@radix-ui/react-checkbox';

export default function PrivacySettingCard({
  defaultIsPrivate = false,
  updatePrivacy,
}: {
  defaultIsPrivate: boolean;
  updatePrivacy: (args: { isPublic: boolean }) => ServerActionResult<Profile>;
}) {
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(
    defaultIsPrivate
  );

  return (
    <SettingCard>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          startSubmitTransition(async () => {
            console.log('submitting', checked);
            const result = await updatePrivacy({
              isPublic: checked === 'indeterminate' ? false : !checked,
            });
            if (result && 'error' in result) {
              toast.error(result.error);
              return;
            }
            toast.success('Soukromí profilu bylo úspěšně uloženo');
          });
        }}
      >
        <SettingHeader>
          <SettingHeadline>Soukromí profilu</SettingHeadline>
          <SettingDescription>
            Vyberte, zda chcete, aby váš profil byl veřejný nebo soukromý.
          </SettingDescription>
          <SettingCardContent>
            <div className="flex items-center">
              <Checkbox.Root
                className="flex h-5 w-5 appearance-none hover:bg-smoke/25 items-center justify-center rounded-md bg-white border-[2px] border-border focus:border-text outline-none"
                defaultChecked={defaultIsPrivate}
                checked={checked}
                onCheckedChange={setChecked}
                id="c1"
              >
                <Checkbox.Indicator className="text-text">
                  <IconCheck className="w-4 h-4" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label className="pl-3 text-base text-text" htmlFor="c1">
                Profil je soukromý
              </label>
            </div>
          </SettingCardContent>
        </SettingHeader>
        <SettingFooter>
          <Button
            variant="secondary"
            disabled={isSubmitPending || checked === defaultIsPrivate}
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
