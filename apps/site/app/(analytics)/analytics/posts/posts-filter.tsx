import { BugAntIcon, XMarkIcon } from '@heroicons/react/20/solid';
import FilterSelect from 'components/input/filter-select';
import TextField from 'components/input/text-field';
import { CourseOption, courseOptions } from 'shared';
import { contentTypes, profilations as profilationOptions } from 'shared';
import { EmojiItem, tones as toneOptions } from 'shared';
import { usePostsFilter } from './use-posts-filter';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import useAnalyticsAuth from 'lib/hooks/use-analytics-auth';

const renderEmojiOption = (option: EmojiItem) => (
  <div className="flex items-center">
    <span className="w-4 mr-2">{option.emoji}</span>
    {option.label}
  </div>
);

// const allowedQueryTypes = ['kind', 'course'];

export default function PostsFilter() {
  const {
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
    showDebug,
    setShowDebug,
    isEmpty,
    cleanup,
  } = usePostsFilter();
  const [defaultQuery] = useDebounce(keywordQuery, 1000);
  const { sha256Password } = useAnalyticsAuth();

  const logged =
    sha256Password === process.env.NEXT_PUBLIC_ANALYTICS_PASSWORD_SHA;

  const debouncedSetKeyword = useDebouncedCallback((value) => {
    setKeywordQuery(value);
  }, 200);

  return (
    <div>
      <div className="flex justify-start items-center space-x-3">
        <TextField
          defaultValue={defaultQuery}
          placeholder="Hledat klíčové slovo"
          className="grow"
          inputClassName={`focus:bg-white hover:bg-white ${
            keywordQuery && keywordQuery !== '' ? 'bg-white' : 'bg-background'
          }`}
          onChange={(value) => debouncedSetKeyword(value)}
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
          options={contentTypes}
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
        {logged && (
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
        )}
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
