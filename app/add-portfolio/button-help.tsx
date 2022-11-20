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
export default function ButtonHelp(props: ButtonProps) {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const { children } = props;

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={classNames(
        'px-1',
        'sm:px-2',
        'sm:py-1',
        'text-sm',
        'text-background',
        'cursor-pointer',
        'rounded-r-md',
        'bg-slate',
        'border-2',
        'border-slate',
        'relative',
        'inline-flex',
        'flex-row',
        'items-center',
        'justify-center',
        'rounded-md',
        'overflow-hidden',
        'shadow-sm',
        'outline-none',
        'hover:bg-purple hover:border-purple',
        {
          'ring-2 ring-offset-2 ring-slate bg-slate text-background':
            isFocusVisible,
        }
      )}
    >
      {children}
    </button>
  );
}
