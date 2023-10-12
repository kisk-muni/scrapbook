import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';
import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  text?: string;
  content?: React.ReactNode;
  delayDuration?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  delayDuration,
  text,
  content,
}) => {
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
            'inline-flex items-center rounded-xl px-4 py-2.5',
            'bg-slate',
            'z-50'
          )}
        >
          <TooltipPrimitive.Arrow className="fill-current text-slate" />
          {text ? (
            <span className="block text-sm leading-none text-white">
              {text}
            </span>
          ) : content ? (
            content
          ) : (
            ''
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
