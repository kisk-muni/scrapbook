'use client';
import { Item } from 'components/input/filter-select';
import { useQueryState, Parser } from 'next-usequerystate';
import { CourseOption } from 'shared';
import { EmojiItem } from 'shared';
import {
  Dispatch,
  SetStateAction,
  useContext,
  createContext,
  FC,
  PropsWithChildren,
} from 'react';
import { filters } from './filters';
import { useDebounce } from 'use-debounce';

type QueryStateFilterItem<X extends Item = Item> = X[] | null;
type QueryStateString = string | null;
type QueryStateBoolean = boolean | null;

type PostsFilterContextType = {
  keywordQuery: QueryStateString;
  setKeywordQuery: Dispatch<SetStateAction<QueryStateString>>;
  kinds: QueryStateFilterItem;
  setKinds: Dispatch<QueryStateFilterItem>;
  showDebug?: QueryStateBoolean;
  setShowDebug: Dispatch<QueryStateBoolean>;
  courses: QueryStateFilterItem<CourseOption>;
  setCourses: Dispatch<QueryStateFilterItem<CourseOption>>;
  profilations: QueryStateFilterItem<EmojiItem>;
  setProfilations: Dispatch<QueryStateFilterItem<EmojiItem>>;
  tones: QueryStateFilterItem<EmojiItem>;
  setTones: Dispatch<QueryStateFilterItem<EmojiItem>>;
  languages: QueryStateFilterItem<EmojiItem>;
  setLanguages: Dispatch<QueryStateFilterItem<EmojiItem>>;
  isEmpty: boolean;
  cleanup: () => void;
  getUrlSearchParams: () => URLSearchParams;
};

export const PostsFilterContext = createContext<PostsFilterContextType | null>(
  null
);

export function usePostsFilter() {
  const result = useContext(PostsFilterContext);
  if (!result) {
    throw new Error();
  }
  return result;
}

function useFilter<T>(filter: keyof typeof filters) {
  return useQueryState(
    filters[filter].tag,
    filters[filter].parser as Parser<T>
  );
}

export const PostsFilterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [keywordQuery, setKeywordQuery] = useFilter<string>('keyword');
  const [kinds, setKinds] = useFilter<Item[]>('kinds');
  const [courses, setCourses] = useFilter<CourseOption[]>('courses');
  const [profilations, setProfilations] =
    useFilter<EmojiItem[]>('profilations');
  const [tones, setTones] = useFilter<EmojiItem[]>('tones');
  const [languages, setLanguages] = useFilter<EmojiItem[]>('languages');
  const [showDebug, setShowDebug] = useFilter<boolean>('showDebug');
  const isEmpty =
    (!keywordQuery || keywordQuery === '') &&
    !kinds &&
    !courses &&
    !profilations &&
    !tones &&
    !languages;
  const cleanup = () => {
    setKeywordQuery('');
    setKinds(null);
    setCourses(null);
    setProfilations(null);
    setTones(null);
    setLanguages(null);
  };

  // convert keywordQuery, kinds, courses, profilations, tones, languages to a query string
  const getUrlSearchParams = (separator = ',') => {
    const params = new URLSearchParams();
    if (keywordQuery) {
      params.set('q', keywordQuery);
    }
    if (kinds) {
      params.set('kinds', kinds.map((v) => v.value).join(separator));
    }
    if (courses) {
      params.set('courses', courses.map((v) => v.value).join(separator));
    }
    if (profilations) {
      params.set(
        'profilations',
        profilations.map((v) => v.value).join(separator)
      );
    }
    if (tones) {
      params.set('tones', tones.map((v) => v.value).join(separator));
    }
    if (languages) {
      params.set('languages', languages.map((v) => v.value).join(separator));
    }
    return params;
  };

  return (
    <PostsFilterContext.Provider
      value={{
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
        getUrlSearchParams,
      }}
    >
      {children}
    </PostsFilterContext.Provider>
  );
};
