'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';
import { OverlayProvider } from 'react-aria';

export function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <PlausibleProvider
        domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN as string}
      >
        <QueryClientProvider client={queryClient}>
          <OverlayProvider>{children}</OverlayProvider>
        </QueryClientProvider>
      </PlausibleProvider>
    </SessionProvider>
  );
}
