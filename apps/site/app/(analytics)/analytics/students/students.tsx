'use client';
import useApi from 'lib/use-api';
import Link from 'next/link';
import { LinkIcon } from '@heroicons/react/20/solid';
import { LockClosedIcon } from '@radix-ui/react-icons';
import Tooltip from 'components/tooltip';
import { StudentsApiResult } from './api/route';
import { Avatar } from 'components/avatar';
// import Indicator from 'components/chart/indicator';
import useAnalyticsAuth from 'lib/hooks/use-analytics-auth';
import useAnalyticsGlobalFilter from 'lib/hooks/use-analytics-global-filter';

export default function StudentsList() {
  const { password } = useAnalyticsAuth();
  const { cohorts } = useAnalyticsGlobalFilter();
  const url = new URL(process.env.NEXT_PUBLIC_APP_URL + '/api');
  if (password) {
    url.searchParams.set('p', password);
  }
  if (cohorts) {
    url.searchParams.set(
      'cohorts',
      cohorts.map((cohort) => cohort.value).join('-')
    );
  }
  const { data } = useApi<StudentsApiResult>(url.toString());

  return (
    <div className="rounded-lg overflow-hidden">
      <table className="table-auto w-full text-sm text-left text-text">
        <thead className="text-xs text-text uppercase bg-white border-b border-snow">
          <tr>
            <th scope="col" className="px-6 py-3 text-lg font-extrabold"></th>
            <th scope="col" className="px-6 py-3 text-lg font-extrabold">
              Poslední aktivita
            </th>
            {/*
            <th scope="col" className="px-6 py-3 text-lg font-extrabold">
              ~ Profilace
            </th>
            <th scope="col" className="px-6 py-3 text-lg font-extrabold">
              ~ Témata
            </th>
            <th scope="col" className="px-6 py-3 text-lg font-extrabold">
              ~ Sentiment
  </th>*/}
            <th scope="col" className="px-6 py-3 text-lg font-extrabold">
              Stránky
            </th>
            {cohorts === null && (
              <th scope="col" className="px-6 py-3 text-lg font-extrabold">
                Ročník
              </th>
            )}
            <th scope="col" className="px-6 py-3 text-lg font-extrabold">
              Soukromí
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((student) => {
            return (
              <tr
                key={student.id}
                className="bg-white border-b border-snow hover:bg-snow"
              >
                <td className="px-6 py-3 flex items-center">
                  <Avatar
                    imageUrl={
                      student?.portfolios?.length
                        ? student.portfolios[0].image_url
                        : ''
                    }
                    className="rounded-full border border-smoke w-8 h-8 mr-3 text-lg"
                    size={32}
                    name={student.full_name || student.username}
                  />
                  <Link
                    className="text-text hover:text-blue"
                    href={
                      process.env.NEXT_PUBLIC_APP_URL +
                      '/' +
                      encodeURIComponent(student.username)
                    }
                  >
                    {student.full_name ? student.full_name : student.username}
                  </Link>{' '}
                  {student.portfolios.length > 0 && (
                    <Tooltip text="Otevřít originální stránku portfolia v nové kartě">
                      <Link
                        target="_blank"
                        href={student.portfolios[0].url}
                        className="text-sm text-muted hover:text-text ml-1.5"
                      >
                        <LinkIcon className="w-4 h-4 -ml-px -mt-px" />
                      </Link>
                    </Tooltip>
                  )}
                </td>
                <td className="px-6 py-4">
                  {student.lastActivity
                    ? new Date(student.lastActivity).toLocaleDateString()
                    : ''}
                </td>
                {/*
                <td className="px-6 py-4">Design</td>
                <td className="px-6 py-4">
                  <Indicator
                    categories={[
                      {
                        name: 'design',
                        value: Math.floor(Math.random() * 30) + 1,
                        label: 'design',
                        color: 'bg-blue',
                      },
                      {
                        name: 'development',
                        value: Math.floor(Math.random() * 30) + 1,
                        label: 'development',
                        color: 'bg-purple',
                      },
                      {
                        name: 'edtech',
                        value: Math.floor(Math.random() * 30) + 1,
                        label: 'edtech',
                        color: 'bg-green',
                      },
                      {
                        name: 'libraries',
                        value: Math.floor(Math.random() * 30) + 1,
                        label: 'libraries',
                        color: 'bg-pink',
                      },
                    ]}
                  />
                </td>
                <td className="px-6 py-4">
                  <Indicator
                    categories={[
                      {
                        name: 'sad',
                        value: Math.floor(Math.random() * 30) + 1,
                        label: 'sad',
                        color: 'bg-red',
                      },
                      {
                        name: 'happy',
                        value: Math.floor(Math.random() * 30) + 1,
                        label: 'happy',
                        color: 'bg-blue',
                      },
                      {
                        name: 'formal',
                        value: Math.floor(Math.random() * 30) + 1,
                        label: 'formal',
                        color: 'bg-purple',
                      },
                    ]}
                  />
                  </td>*/}
                <td className="px-6 py-4">
                  {student.portfolios.length > 0
                    ? student.portfolio_pages != 0
                      ? student.portfolio_pages
                      : '-'
                    : '-'}
                </td>
                {cohorts === null && (
                  <td className="px-6 py-4">
                    {(student.study_start_semester_year || '') +
                      ' ' +
                      (student.study_start_semester_kind || '')}
                  </td>
                )}
                <td className="px-6 py-4">
                  {!student.is_public ? (
                    <Tooltip text="K profilu máte přístup, student si však nepřeje aby byla URL adresa portfolia prozrazena.">
                      <LockClosedIcon className="w-4 h-4 mr-1 -ml-px -mt-px" />
                    </Tooltip>
                  ) : (
                    'veřejný'
                  )}{' '}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
