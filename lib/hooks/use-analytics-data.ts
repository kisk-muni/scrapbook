import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type Cohort = {
  value: string;
  label: string;
};

export type FilterData = {
  cohorts: Cohort[];
};

export type Password = string;
export type IsLogged = boolean;

type AnalyticsDataContextType = {
  filterData: FilterData;
  setFilterData: Dispatch<SetStateAction<FilterData>>;
  password?: string;
  setPassword: Dispatch<SetStateAction<Password>>;
};

export const AnalyticsDataContext =
  createContext<AnalyticsDataContextType | null>(null);

export default function useAnalyticsData() {
  const result = useContext(AnalyticsDataContext);
  if (!result) {
    throw new Error();
  }
  return result;
}
