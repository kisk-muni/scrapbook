import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';
import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  delayDuration?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ children, delayDuration, text }) => {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          className={clsx(
            'radix-side-top:animate-slide-down-fade',
            'radix-side-right:animate-slide-left-fade',
            'radix-side-bottom:animate-slide-up-fade',
            'radix-side-left:animate-slide-right-fade',
            'inline-flex items-center rounded-md px-4 py-2.5',
            'bg-slate'
          )}
        >
          <TooltipPrimitive.Arrow className="fill-current text-slate" />
          <span className="block text-xs leading-none text-white">{text}</span>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
