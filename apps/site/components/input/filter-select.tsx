import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';

export type Item = {
  value: string;
  label: string;
};

export type LightItem<T extends Item> = Omit<T, 'label'> & { filter: string };
interface FilterSelectProps<T extends Item> {
  value: T[] | null;
  onChange?: (value: T[] | null) => void;
  options: T[];
  ariaLabel: string;
  renderLabel?: (selected: T[] | null, ariaLabel?) => React.ReactNode;
  renderOption?: (option: T) => React.ReactNode;
  filterPredicate?: (value: T, query: string) => unknown;
  defaultValue?: T[];
  placeholder: string;
  filterPlaceholder?: string;
  filterTitle?: string;
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
      // we keep the internal value as empty array, but allow nullable value from outside
      value={value || []}
      onChange={(v) => {
        // pass null value if empty array, otherwise pass new array
        onChange && onChange(v.length > 0 ? [...v] : null);
      }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      by="value"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      multiple
    >
      <div className="relative">
        <div className="relative w-full cursor-default text-left ">
          <Combobox.Button
            className={classNames(
              'inline-flex relative items-center justify-center gap-1 font-medium rounded-xl cursor-pointer px-4 py-2.5 text-base border-2 border-sunken transition ease-in-out delay-50',
              {
                'bg-background hover:bg-white focus:bg-white text-muted hover:text-text ui-open:bg-white ui-open:text-text':
                  !value || value.length === 0,
                'bg-white text-text': value && value.length > 0,
              }
            )}
          >
            {renderLabel ? renderLabel(value, ariaLabel) : ariaLabel}
            {value && value.length > 0 && (
              <div className="absolute h-2 w-2 border border-white rounded-full bg-blue right-1 top-1"></div>
            )}
            <ChevronDownIcon className="-mt-px h4" />
          </Combobox.Button>

          <Combobox.Options
            as="div"
            className="absolute z-50 mt-1 w-72 -right-1.5 overflow-hidden rounded-xl bg-white text-base shadow-xl ring-2 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {filterTitle && (
              <div className="py-2 px-3 flex items-center justify-between border-b-2 border-smoke/50">
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
