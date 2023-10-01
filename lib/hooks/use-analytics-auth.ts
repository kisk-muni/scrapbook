import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type Password = string;

type AnalyticsAuthContextType = {
  password?: string;
  setPassword: Dispatch<SetStateAction<Password>>;
};

export const AnalyticsAuthContext =
  createContext<AnalyticsAuthContextType | null>(null);

export default function useAnalyticsAuth() {
  const result = useContext(AnalyticsAuthContext);
  if (!result) {
    throw new Error();
  }
  return result;
}
