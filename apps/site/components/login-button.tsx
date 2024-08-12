'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';

import { Button, type ButtonProps } from 'components/ui/button-radix';
import { IconSpinner } from 'components/ui/icons';

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean;
  text?: string;
}

export function LoginButton({
  text = 'Přihlásit se',
  variant = 'subtle',
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <Button
      variant={variant}
      size="header"
      onClick={() => {
        setIsLoading(true);
        // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
        signIn('google', { callbackUrl: `localhost:3000/` });
      }}
      className="uppercase"
      rounded="full"
      disabled={isLoading}
      {...props}
    >
      {isLoading && <IconSpinner className="mr-2 animate-spin" />}
      <span className="text-nowrap shrink-0">{text}</span>
    </Button>
  );
}
