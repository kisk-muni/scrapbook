import type { RadioGroupProps, RadioProps } from '@react-types/radio';
import React from 'react';
import {
  useRadioGroup,
  useRadio,
  VisuallyHidden,
  useFocusRing,
  mergeProps,
} from 'react-aria';
import { RadioGroupState, useRadioGroupState } from 'react-stately';

const SwatchContext = React.createContext<RadioGroupState>(null);

interface SwatchGroupProps extends RadioGroupProps {
  children: React.ReactNode;
}

export function CardGroup(props: SwatchGroupProps) {
  const { children, label } = props;
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(
    {
      ...props,
      orientation: 'horizontal',
    },
    state
  );

  return (
    <div {...radioGroupProps}>
      <span {...labelProps} className="text-lg text-text">
        {label}
      </span>
      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <SwatchContext.Provider value={state}>
          {children}
        </SwatchContext.Provider>
      </div>
    </div>
  );
}

export function Card(props: RadioProps) {
  const state = React.useContext(SwatchContext);
  const ref = React.useRef(null);
  const { inputProps } = useRadio(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  let ring = '';
  if (isFocusVisible) {
    ring = `ring-2 ring-offset-2 ring-slate bg-slate text-background`;
  } else if (state.selectedValue === props.value) {
    ring = `bg-slate text-background`;
  } else {
    ring = 'bg-smoke hover:bg-sunken text-text';
  }

  return (
    <label
      className={`${props.value} rounded-md cursor-pointer px-2 py-2 sm:px-4 sm:py-3 text-base ${ring}`}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      {props.children}
    </label>
  );
}
