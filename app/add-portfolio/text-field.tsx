import { useRef } from 'react';
import {
  AriaTextFieldOptions,
  mergeProps,
  useFocusRing,
  useTextField,
} from 'react-aria';

interface TextFieldProps extends AriaTextFieldOptions<'input'> {
  className?: string;
  description?: string;
  errorMessage?: string;
  label?: string;
}

export default function TextField(props: TextFieldProps) {
  const { label } = props;
  const ref = useRef();
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  let ring = '';
  if (isFocusVisible) {
    ring = `border-black`;
  }

  return (
    <div className={`flex flex-col w-full `}>
      <label {...labelProps} className="">
        {label}
      </label>
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={ref}
        className={`rounded-md border-2 border-smoke cursor-text p-2 sm:p-3 text-base outline-0 focus:border-slate ${ring}`}
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
