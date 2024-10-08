'use client';
import {
  AnalyticsGlobalFilterContext,
  Cohort,
} from '../../../lib/hooks/use-analytics-global-filter';
import {
  Password,
  AnalyticsAuthContext,
} from '../../../lib/hooks/use-analytics-auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from 'components/logo';
import classNames from 'classnames';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import FilterSelect from 'components/input/filter-select';
import { useQueryState } from 'next-usequerystate';
import { cohortsOptions, cohortsParser } from 'shared';
import { sha256 } from 'js-sha256';

const tabs = [
  /*   {
    label: 'Přehled',
    href: '/analytics',
  }, */
  {
    label: 'Příspěvky',
    href: '/analytics/posts',
  },
  {
    label: 'Studenti',
    href: '/analytics/students',
  },
  {
    label: 'Nastavení',
    href: '/analytics/settings',
  },
];

export default function RootLayout({
  children,
  defaultPassword = '',
}: {
  children: React.ReactNode;
  defaultCohorts?: Cohort[] | null;
  defaultPassword?: Password;
}) {
  const pathname = usePathname();
  const [password, setPassword] = useState<Password>(defaultPassword);
  const [sha256Password, setSha256Password] =
    useState<Password>(defaultPassword);
  const [cohorts, setCohorts] = useQueryState('cohorts', cohortsParser);

  useEffect(() => {
    console.log('useEffect called');
    const password = JSON.parse(localStorage.getItem('ap') as string);
    if (password) {
      setPassword(password);
      setSha256Password(sha256(password));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ap', JSON.stringify(password));
  }, [password]);

  return (
    <AnalyticsAuthContext.Provider
      value={{ password, setPassword, sha256Password, setSha256Password }}
    >
      <AnalyticsGlobalFilterContext.Provider
        value={{
          cohorts,
          setCohorts,
        }}
      >
        <header className="mb-6">
          <nav className="border-b-2 mt-5 border-smoke border-dashed flex justify-between">
            <div className="flex w-full justify-start items-center -mb-0.5">
              {tabs.map((tab) => (
                <Link
                  href={tab.href}
                  key={tab.href}
                  className={classNames({
                    '-ml-3': tab.href == '/analytics',
                  })}
                >
                  <button
                    className={classNames(
                      'block relative py-1.5 px-3 mb-2 font-medium whitespace-nowrap hover:bg-white hover:text-text rounded-lg',
                      {
                        'text-text': pathname == tab.href,
                        'text-muted': pathname != tab.href,
                      }
                    )}
                  >
                    {tab.label}
                  </button>
                  <div
                    className={classNames('h-[2px] rounded-full mx-3', {
                      'bg-text': pathname == tab.href,
                      'bg-transparent': pathname != tab.href,
                    })}
                  ></div>
                </Link>
              ))}
            </div>
            <div className="flex -mt-3 shrink-0  space-x-6">
              <p className="text-muted ml-4 mt-4 mb-0">
                (poslední aktualizace dat: 29. května 2024)
              </p>
              {pathname != '/analytics/settings' && (
                <FilterSelect
                  ariaLabel="Ročník"
                  placeholder="Ročník"
                  options={cohortsOptions}
                  renderLabel={(selected) => {
                    if (!selected || selected.length == 0)
                      return <span>Všechny ročníky</span>;
                    const label = selected
                      .map((value) => value.label)
                      .slice(0, 3)
                      .join(', ');
                    return (
                      <span className="">
                        {label}
                        {selected.length > 3 && ' ...'}
                      </span>
                    );
                  }}
                  filterPlaceholder="Filtrovat ročníky"
                  filterTitle="Filtrovat podle ročníku"
                  value={cohorts}
                  onChange={(v) => setCohorts(v)}
                />
              )}
            </div>
          </nav>
        </header>
        <main className="mb-12">
          <div className="flex justify-end">
            {/*<div className="fixed bottom-1 block right-1 z-50 flex h-min w-5/6 items-center justify-start rounded-xl bg-darkless p-3 font-mono text-xs text-background">
              {JSON.stringify(log)}
                  </div>*/}
          </div>
          {children}
        </main>
      </AnalyticsGlobalFilterContext.Provider>
    </AnalyticsAuthContext.Provider>
  );
}
