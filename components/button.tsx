import { useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

export default function Button(props: AriaButtonProps<'button'>) {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      className="pl-4 pr-4 -ml-px pt-2 pb-2 text-sm text-gray-700 rounded-r-md border hover:bg-gray-50 relative inline-flex flex-row items-center justify-between rounded-md overflow-hidden cursor-default shadow-sm outline-none border-gray-300 bg-white"
    >
      {children}
    </button>
  );
}
