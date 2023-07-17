import { BugAntIcon, XMarkIcon } from '@heroicons/react/20/solid';
import FilterSelect from 'components/input/filter-select';
import TextField from 'components/input/text-field';
import { CourseOption, courseOptions } from 'lib/data/courses';
import { EmojiItem, languages, postKinds, profilations } from 'lib/data/rest';
import useSearchQuery, {
  searchQueryToString,
} from 'lib/hooks/use-search-query';
import { useEffect, useState } from 'react';

const renderEmojiOption = (option: EmojiItem) => (
  <div className="flex items-center">
    <span className="w-4 mr-2">{option.emoji}</span>
    {option.label}
  </div>
);

export default function PostsFilter() {
  const [manualQueryInput, setManualQueryInput] = useState('');
  const [showDebug, setShowDebug] = useState(false);
  const { query, setFromString, setParamFilter, isEmpty, set } =
    useSearchQuery();

  useEffect(() => {
    setManualQueryInput(searchQueryToString(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFromString(manualQueryInput);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [manualQueryInput, query]);

  return (
    <div>
      <div className="flex justify-start items-center space-x-4">
        <TextField
          placeholder="Hledat klíčové slovo"
          className="grow"
          value={manualQueryInput}
          onChange={(value) => {
            setManualQueryInput(value);
          }}
        />
        <FilterSelect<CourseOption>
          value={[]}
          ariaLabel="Kurz"
          placeholder="Kurz"
          onChange={(v: { value: string }[]) => {
            setParamFilter({
              param: 'course',
              value: v.map((i) => i.value),
            });
            setManualQueryInput(searchQueryToString(query));
          }}
          options={courseOptions}
          renderOption={(option) => (
            <div className="py-1">
              <div className="mb-0.5">
                <span className="rounded-md inline-block bg-muted text-white font-medium text-xs leading-tight pt-[2px] pb-[1px] px-1 mr-1">
                  {option.code}
                </span>
              </div>
              <div className="leading-tight">{option.label}</div>
            </div>
          )}
          filterPlaceholder="Filtrovat kurzy"
          filterTitle="Filtrovat podle kurzu"
          filterPredicate={(item, query) =>
            item.label.toLowerCase().includes(query.toLowerCase()) ||
            item.code.toLowerCase().includes(query.toLowerCase())
          }
        />
        {/*  <FilterSelect
          ariaLabel="Druh"
          placeholder="Druh"
          onChange={(v: { value: string }[]) => {
            setParamFilter({
              param: 'kind',
              value: v.map((i) => i.value),
            });
            setManualQueryInput(searchQueryToString(query));
          }}
          options={postKinds}
          filterTitle="Filtrovat podle druhu"
          filterPlaceholder="Filtrovat druhy"
        />
        <FilterSelect
          ariaLabel="Profilace"
          placeholder="Profilace"
          onChange={(v: { value: string }[]) => {
            setParamFilter({
              param: 'profiling',
              value: v.map((i) => i.value),
            });
            setManualQueryInput(searchQueryToString(query));
          }}
          options={profilations}
          renderOption={renderEmojiOption}
          filterTitle="Filtrovat podle profilace"
          filterPlaceholder="Filtrovat profilace"
        />
        <FilterSelect<Tone>
          ariaLabel="Sentiment"
          placeholder="Sentiment"
          onChange={(v: { value: string }[]) => {
            setParamFilter({
              param: 'sentiment',
              value: v.map((i) => i.value),
            });
            setManualQueryInput(searchQueryToString(query));
          }}
          options={tones}
          renderOption={renderEmojiOption}
          filterTitle="Filtrovat podle sentimentu"
          filterPlaceholder="Filtrovat sentiment"
        />
        <FilterSelect
          ariaLabel="Jazyk"
          placeholder="Jazyk"
          onChange={(v: { value: string }[]) => {
            setParamFilter({
              param: 'lang',
              value: v.map((i) => i.value),
            });
            setManualQueryInput(searchQueryToString(query));
          }}
          options={languages}
          renderOption={renderEmojiOption}
          filterTitle="Filtrovat podle jazyka"
          filterPlaceholder="Filtrovat jazyky"
        /> */}
      </div>
      {!isEmpty && (
        <div className="mt-3 flex justify-between">
          <button
            className="group text-muted hover:text-blue flex items-center"
            onClick={() => {
              setManualQueryInput('');
            }}
          >
            <XMarkIcon className="h-5 w-5 p-0.5 rounded-md text-sheet bg-muted group-hover:bg-blue mr-1.5 -mt-px" />{' '}
            Vypnout filtraci a vyhledávání{' '}
          </button>
          <button
            className="group text-muted hover:text-blue flex items-center"
            onClick={() => {
              setShowDebug(!showDebug);
            }}
          >
            <BugAntIcon className="h-5 w-5 p-0.5 rounded-md text-muted group-hover:text-blue mr-1.5 -mt-px" />{' '}
          </button>
        </div>
      )}
      {!isEmpty && showDebug && (
        <div className="mt-3 text-sm text-white bg-slate rounded-lg p-4">
          <pre>{JSON.stringify(query, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
