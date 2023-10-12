import { urlSelectParser } from "./parsers";

export const firstSemesterYear = 2015;
export const cohortsOptions = Array.from(
  { length: new Date().getFullYear() - firstSemesterYear + 1 },
  (_, i) => {
    const year = firstSemesterYear + i;
    return [
      {
        label: `${year} podzim`,
        value: `${year}podzim`,
      },
      {
        label: `${year} jaro`,
        value: `${year}jaro`,
      },
    ];
  }
)
  .flat()
  .reverse();

export const cohortsParser = urlSelectParser(cohortsOptions);
export const cohortsFilter = {
  cohorts: {
    tag: "cohorts",
    parser: cohortsParser,
  },
};
