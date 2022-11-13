'use client';

import { OverlayProvider } from 'react-aria';

export function Providers({ children }) {
  return <OverlayProvider>{children}</OverlayProvider>;
}
