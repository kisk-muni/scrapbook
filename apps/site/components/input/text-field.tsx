import { useRef } from 'react';
import {
  AriaTextFieldOptions,
  mergeProps,
  useFocusRing,
  useTextField,
} from 'react-aria';
import cn from 'classnames';

interface TextFieldProps extends AriaTextFieldOptions<'input'> {
  className?: string;
  description?: string;
  errorMessage?: string;
  label?: string;
  small?: boolean;
  inputClassName?: string;
}

export default function TextField(props: TextFieldProps) {
  const { label, className, small } = props;
  const ref = useRef() as unknown as React.MutableRefObject<HTMLInputElement>;
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  let ring = '';
  if (isFocusVisible) {
    ring = `border-black`;
  }

  return (
    <div className={cn(`flex flex-col w-full`, className)}>
      {label && (
        <label {...labelProps} className="font-bold mb-2 text-slate">
          {label}
        </label>
      )}
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={ref}
        className={`rounded-xl box-border border-2 border-smoke hover:bg-white focus:bg-white cursor-text ${
          small ? 'p-1 sm:p-1' : 'p-[10px]'
        } placeholder-muted text-text outline-0 focus:border-slate ${ring} ${
          props?.inputClassName
        } transition ease-in-out delay-50`}
      />
      {props.description && (
        <div {...descriptionProps} className="text-sm">
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} className="text-red mt-2">
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}
