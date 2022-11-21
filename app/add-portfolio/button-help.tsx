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
      className={classNames('cursor-pointer', 'hover:underline', {
        'ring-2 ring-offset-2 ring-slate': isFocusVisible,
      })}
    >
      {children}
    </button>
  );
}
