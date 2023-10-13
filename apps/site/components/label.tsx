import classNames from 'classnames';
import React, { forwardRef } from 'react';

export const Label = forwardRef(function Label(
  props: {
    children: React.ReactNode;
    className?: string;
  },
  forwardedRef: React.Ref<HTMLDivElement>
) {
  const { children, className } = props;
  return (
    <div
      ref={forwardedRef}
      {...props}
      className={classNames(
        'inline-block rounded-full bg-[#e7e7e7] border border-white text-base px-2 mr-0.5 mb-0.5 whitespace-nowrap break-keep',
        className
      )}
    >
      {children}
    </div>
  );
});
