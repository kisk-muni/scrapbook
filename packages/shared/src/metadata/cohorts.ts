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

export const getGranularCohorts = (cohorts: string[]) => {
  return cohorts
    .map((cohort) => {
      const matches = cohort.match(/^(\d+)([a-zA-Z]+)/);
      if (matches) {
        const year = parseInt(matches[1], 10);
        const kind = matches[2];
        return {
          year,
          kind: kind === "jaro" ? kind : "podzim",
        };
      }
    })
    .filter((cohort) => cohort != undefined) as {
    year: number;
    kind: "jaro" | "podzim";
  }[];
};

export const getCohortsFromParamsString = (urlParam: string) => {
  const parsed = cohortsFilter.cohorts.parser.parse(urlParam);
  return getGranularCohorts((parsed || []).map((cohort) => cohort.value));
};
