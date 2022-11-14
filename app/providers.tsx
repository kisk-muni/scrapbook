'use client';
import PlausibleProvider from 'next-plausible';
import { OverlayProvider } from 'react-aria';

export function Providers({ children }) {
  return (
    <PlausibleProvider domain="kisk.vercel.app">
      <OverlayProvider>{children}</OverlayProvider>
    </PlausibleProvider>
  );
}
