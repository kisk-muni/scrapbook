import { urlSelectParser, urlStringParser, urlBooleanParser } from 'shared';
import { courseOptions } from 'shared';
import {
  languages as langOptions,
  postKinds,
  profilations as profilationOptions,
} from 'shared';
import { tones as toneOptions } from 'shared';

export const keywordParser = urlStringParser();
export const kindsParser = urlSelectParser(postKinds);
export const coursesParser = urlSelectParser(courseOptions);
export const profilationsParser = urlSelectParser(profilationOptions);
export const tonesParser = urlSelectParser(toneOptions);
export const languagesParser = urlSelectParser(langOptions);
export const showDebugParser = urlBooleanParser();

export const filters = {
  keyword: {
    tag: 'q',
    parser: keywordParser,
  },
  kinds: {
    tag: 'kinds',
    parser: kindsParser,
  },
  courses: {
    tag: 'courses',
    parser: coursesParser,
  },
  profilations: {
    tag: 'profilations',
    parser: profilationsParser,
  },
  tones: {
    tag: 'tones',
    parser: tonesParser,
  },
  languages: {
    tag: 'languages',
    parser: languagesParser,
  },
  showDebug: {
    tag: 'debug',
    parser: showDebugParser,
  },
};
