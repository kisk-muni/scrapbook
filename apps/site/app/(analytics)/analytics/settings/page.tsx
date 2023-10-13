'use client';

import TextField from 'components/input/text-field';
import Heading from '../heading';
import useAnalyticsAuth from 'lib/hooks/use-analytics-auth';

export default function SettingsPage() {
  const { password, setPassword } = useAnalyticsAuth();

  return (
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
          onChange={(value) => setPassword(value)}
        />
      </div>
    </div>
  );
}