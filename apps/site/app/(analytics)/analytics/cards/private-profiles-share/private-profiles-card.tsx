'use client';
import useApi from 'lib/use-api';
import useAnalyticsGlobalFilter from '../../../../../lib/hooks/use-analytics-global-filter';
import { PrivateProfilesShareApiResult } from './route';
import Heading from '../../heading';
import MyPieChart from '../../../../../components/chart/pie-chart';
import useAnalyticsAuth from 'lib/hooks/use-analytics-auth';

export default function PrivateProfilesCard() {
  const { cohorts } = useAnalyticsGlobalFilter();
  const { password } = useAnalyticsAuth();
  const url = new URL(
    process.env.NEXT_PUBLIC_APP_URL + '/analytics/cards/private-profiles-share'
  );
  if (password) {
    url.searchParams.set('p', password);
  }
  if (cohorts) {
    url.searchParams.set(
      'cohorts',
      cohorts.map((cohort) => cohort.value).join('-')
    );
  }
  const { data } = useApi<PrivateProfilesShareApiResult>(url.toString());

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-xl overflow-hidden bg-white px-2 pt-4 pb-6 mt-6">
        <Heading className="px-4 mb-3">Viditelnost profilů</Heading>
        <div className="w-full h-64 relative">
          {data?.counts && <MyPieChart data={data?.counts} dataKey="count" />}
        </div>
      </div>
    </div>
  );
}
