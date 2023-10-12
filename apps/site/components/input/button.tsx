'use client';
import { useRef } from 'react';
import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
} from 'react-aria';
import classNames from 'classnames';

interface ButtonProps extends AriaButtonProps<'button'> {
  className?: string;
}

export default function Button(props: ButtonProps) {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const { children } = props;

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={classNames(
        'px-4',
        'sm:px-4',
        'py-2',
        'sm:py-3',
        'text-base',
        'text-background',
        'cursor-pointer',
        'bg-slate',
        'relative',
        'inline-flex',
        'flex-row',
        'items-center',
        'justify-center',
        'rounded-xl',
        'overflow-hidden',
        'shadow-md',
        'font-semibold',
        'outline-none',
        'hover:bg-purple hover:border-purple',
        'transition ease-in-out delay-50',
        {
          'ring-2 ring-offset-2 ring-slate bg-slate text-background':
            isFocusVisible,
        },
        props.className
      )}
    >
      {children}
    </button>
  );
}
