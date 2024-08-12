'use client';

import TextField from 'components/input/text-field';
import Heading from '../heading';
import useAnalyticsAuth from 'lib/hooks/use-analytics-auth';
import { useDebouncedCallback } from 'use-debounce';
import { sha256 } from 'js-sha256';
import { Suspense } from 'react';

export default function SettingsPage() {
  const { password, sha256Password, setPassword, setSha256Password } =
    useAnalyticsAuth();

  const debouncedSha256 = useDebouncedCallback(
    (value) => setSha256Password(sha256(value)),
    200
  );

  return (
    <Suspense>
      <div className="w-full mt-6">
        <div className="mx-auto max-w-lg">
          <Heading className="text-2xl mb-2">Zobrazit soukromé profily</Heading>
          <p className="text-text mb-4 text-lg">
            Pro přístup k soukromým profilům studentů a jejich zahrnutí do
            souhrnných statistik zadejte učitelské heslo.
          </p>
          <TextField
            label="Učitelské heslo"
            type="password"
            placeholder="eg. Luciano Floridi"
            className="w-full"
            value={password}
            onChange={(value) => {
              setPassword(value);
              debouncedSha256(value);
            }}
          />
          <div className="mt-6">
            {sha256Password ===
              process.env.NEXT_PUBLIC_ANALYTICS_PASSWORD_SHA &&
              'Učitelský režim aktivován.'}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
