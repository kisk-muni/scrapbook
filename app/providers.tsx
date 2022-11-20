'use client';
import PlausibleProvider from 'next-plausible';
import { OverlayProvider, SSRProvider } from 'react-aria';

export function Providers({ children }) {
  return (
    <SSRProvider>
      <PlausibleProvider domain="kisk.vercel.app">
        <OverlayProvider>{children}</OverlayProvider>
      </PlausibleProvider>
    </SSRProvider>
  );
}
