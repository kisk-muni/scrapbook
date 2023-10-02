'use client';
import PlausibleProvider from 'next-plausible';
import { OverlayProvider, SSRProvider } from 'react-aria';

export function Providers({ children }) {
  return (
    <SSRProvider>
      <PlausibleProvider
        domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN as string}
      >
        <OverlayProvider>{children}</OverlayProvider>
      </PlausibleProvider>
    </SSRProvider>
  );
}
