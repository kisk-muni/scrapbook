import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { CheckIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

interface SelectProps {
  defaultValue?: string;
  onValueChange(value: string): void;
  options: {
    value: string;
    label: string;
  }[];
  ariaLabel: string;
  placeholder: string;
  value?: string;
}

const MySelect = ({
  defaultValue,
  onValueChange,
  options,
  ariaLabel,
  placeholder,
  value,
}: SelectProps) => {
  return (
    <Select.Root
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      value={value}
    >
      <Select.Trigger
        className="inline-flex items-center justify-center gap-1 rounded-md cursor-pointer px-4 py-2 py-3 text-base bg-smoke hover:bg-sunken text-text"
        aria-label={ariaLabel}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="text-slate">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-12 bg-white text-slate cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="py-2">
            {options.map((option) => {
              return (
                // make the selectitem active
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            })}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-text cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

// eslint-disable-next-line react/display-name
const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps>(
  ({ children, className, value, key, ...props }, forwardedRef) => {
    return (
      <Select.Item
        key={key}
        value={value}
        className={classNames(
          'text-sm leading-none rounded-sm flex items-center py-2 pr-[35px] pl-[25px] relative select-none ',
          'data-[disabled]:text-muted data-[disabled]:pointer-events-none',
          'data-[highlighted]:outline-none data-[highlighted]:bg-snow data-[highlighted]:text-black',
          'hover:bg-snow',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText className="text-lg">{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon className="h-4 w-4" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default MySelect;
