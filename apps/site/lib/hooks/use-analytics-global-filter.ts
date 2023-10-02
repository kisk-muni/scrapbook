import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type Cohort = {
  value: string;
  label: string;
};

export type AnalyticsGlobalFilterContextType = {
  cohorts: Cohort[] | null;
  setCohorts: Dispatch<SetStateAction<Cohort[]>>;
};

export const AnalyticsGlobalFilterContext =
  createContext<AnalyticsGlobalFilterContextType | null>(null);

export default function useAnalyticsGlobalFilter() {
  const result = useContext(AnalyticsGlobalFilterContext);
  if (!result) {
    throw new Error();
  }
  return result;
}
