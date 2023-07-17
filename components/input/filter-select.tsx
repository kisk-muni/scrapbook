import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export type Item = {
  value: string;
  label: string;
};

export type LightItem<T extends Item> = Omit<T, 'label'> & { filter: string };

interface FilterSelectProps<T extends Item> {
  onChange?: (value: T[]) => void;
  options: T[];
  ariaLabel: string;
  renderLabel?: (selected: T[], ariaLabel?) => React.ReactNode;
  renderOption?: (option: T) => React.ReactNode;
  filterPredicate?: (value: T, query: string) => unknown;
  defaultValue?: T[];
  placeholder: string;
  filterPlaceholder?: string;
  filterTitle?: string;
  value: T[];
  showSearch?: boolean;
}

function defaultPredicate<T extends Item>(option: T, query: string) {
  return option.label.toLowerCase().includes(query.toLowerCase());
}

export default function FilterSelect<T extends Item>({
  onChange,
  options,
  value,
  ariaLabel,
  filterPlaceholder,
  filterTitle,
  renderLabel,
  filterPredicate,
  renderOption,
  showSearch = true,
}: FilterSelectProps<T>) {
  const [query, setQuery] = useState<string>('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          filterPredicate
            ? filterPredicate(option, query)
            : defaultPredicate(option, query)
        );

  return (
    <Combobox
      value={value}
      onChange={(v) => {
        onChange && onChange(v);
      }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      by="value"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      multiple
    >
      <div className="relative">
        <div className="relative w-full cursor-default rounded-lg bg-white text-left ">
          <Combobox.Button className="inline-flex relative items-center justify-center gap-1 rounded-md cursor-pointer px-4 py-2 py-3 text-base bg-smoke hover:bg-sunken text-text">
            {renderLabel ? renderLabel(value, ariaLabel) : ariaLabel}
            {value.length > 0 && (
              <div className="absolute h-2 w-2 border border-white rounded-full bg-blue right-1 top-1"></div>
            )}
            <ChevronDownIcon className="-mt-px h4" />
          </Combobox.Button>

          <Combobox.Options
            as="div"
            className="absolute z-50 mt-1 w-72 -right-1.5 overflow-hidden rounded-md bg-white text-base shadow-xl ring-2 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {filterTitle && (
              <div className="py-2 px-2 flex items-center justify-between border-b-2 border-smoke/50">
                <span className="text-sm font-bold text-slate">
                  {filterTitle}
                </span>
                <Combobox.Button
                  as="button"
                  className="text-muted hover:text-slate"
                >
                  <XMarkIcon className="w-4 h-4" />
                </Combobox.Button>
              </div>
            )}
            {showSearch && (
              <div className="p-2 border-b-2 border-smoke/50">
                <Combobox.Input
                  className={
                    'w-full rounded-md text-sm p-1 box-border border-2 border-smoke cursor-text  text-base outline-0 focus:border-slate'
                  }
                  placeholder={filterPlaceholder || 'Filtrovat'}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            )}
            <ul className="overflow-auto max-h-80 pointer-events-auto">
              {filteredOptions.map((item) => (
                <Combobox.Option
                  key={item.value}
                  value={item}
                  className="flex items-start px-1.5 py-1 pr-4 border-b last:border-b-0 border-smoke text-sm items-center ui-active:bg-snow ui-not-active:bg-white ui-not-active:text-black"
                >
                  <CheckIcon className="shrink-0 h-6 w-6 px-1 hidden ui-selected:block" />
                  <div className="w-6 px-1 h-6 shrink-0 ui-selected:hidden"></div>
                  {renderOption ? renderOption(item) : item.label}
                </Combobox.Option>
              ))}
            </ul>
          </Combobox.Options>
        </div>
      </div>
    </Combobox>
  );
}
