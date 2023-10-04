import { BugAntIcon, XMarkIcon } from '@heroicons/react/20/solid';
import FilterSelect from 'components/input/filter-select';
import TextField from 'components/input/text-field';
import { CourseOption, courseOptions } from 'shared';
import {
  languages as langOptions,
  postKinds,
  profilations as profilationOptions,
} from 'shared';
import { EmojiItem, tones as toneOptions } from 'shared';
import { usePostsFilter } from './use-posts-filter';
import { useState } from 'react';

const renderEmojiOption = (option: EmojiItem) => (
  <div className="flex items-center">
    <span className="w-4 mr-2">{option.emoji}</span>
    {option.label}
  </div>
);

// const allowedQueryTypes = ['kind', 'course'];

export default function PostsFilter() {
  /*   const { query, setFromString, setParamFilter, set } =
    useSearchQuery(); */
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
  const {
    setIsTyping,
    keywordQuery,
    setKeywordQuery,
    kinds,
    setKinds,
    courses,
    setCourses,
    profilations,
    setProfilations,
    tones,
    setTones,
    languages,
    setLanguages,
    showDebug,
    setShowDebug,
    isEmpty,
    cleanup,
  } = usePostsFilter();

  return (
    <div>
      <div className="flex justify-start items-center space-x-4">
        <TextField
          placeholder="Hledat klíčové slovo"
          className="grow"
          value={keywordQuery || ''}
          onChange={(value) => {
            setKeywordQuery(value);
            setIsTyping(true);

            clearTimeout(timer);
            const newTimer = setTimeout(() => {
              setIsTyping(false);
            }, 500);

            setTimer(newTimer);
          }}
        />
        <FilterSelect<CourseOption>
          value={courses}
          ariaLabel="Kurz"
          placeholder="Kurz"
          onChange={(v) => setCourses(v)}
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
        <FilterSelect
          value={kinds}
          ariaLabel="Druh"
          onChange={(v) => setKinds(v)}
          placeholder="Druh"
          options={postKinds}
          filterTitle="Filtrovat podle druhu"
          filterPlaceholder="Filtrovat druhy"
        />
        <FilterSelect
          value={profilations}
          ariaLabel="Profilace"
          placeholder="Profilace"
          onChange={(v) => setProfilations(v)}
          options={profilationOptions}
          renderOption={renderEmojiOption}
          filterTitle="Filtrovat podle profilace"
          filterPlaceholder="Filtrovat profilace"
        />
        <FilterSelect<EmojiItem>
          value={tones}
          onChange={(v) => setTones(v)}
          ariaLabel="Sentiment"
          placeholder="Sentiment"
          options={toneOptions}
          renderOption={renderEmojiOption}
          filterTitle="Filtrovat podle sentimentu"
          filterPlaceholder="Filtrovat sentiment"
        />
        <FilterSelect
          value={languages}
          ariaLabel="Jazyk"
          placeholder="Jazyk"
          onChange={(v) => setLanguages(v)}
          options={langOptions}
          renderOption={renderEmojiOption}
          filterTitle="Filtrovat podle jazyka"
          filterPlaceholder="Filtrovat jazyky"
        />
      </div>
      {!isEmpty && (
        <div className="mt-3 flex justify-between">
          <button
            className="group text-muted hover:text-blue flex items-center"
            onClick={cleanup}
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
      {showDebug && (
        <div className="mt-3 text-sm text-white bg-slate rounded-lg p-4">
          <pre>{JSON.stringify(keywordQuery, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
