'use client';
import useApi from 'lib/use-api';
import useAnalyticsGlobalFilter from '../../../../../lib/hooks/use-analytics-global-filter';
import { PrivateProfilesShareApiResult } from './route';
import Heading from '../../heading';
import MyPieChart from '../../../../../components/chart/pie-chart';

export default function PrivateProfilesCard() {
  const { filterData, password } = useAnalyticsGlobalFilter();
  const { data } = useApi<PrivateProfilesShareApiResult>(
    '/analytics/cards/private-profiles-share' +
      '?p=' +
      password +
      '&cohort=' +
      filterData.cohort
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-lg overflow-hidden bg-white px-2 pt-4 pb-6 mt-6">
        <Heading className="px-4 mb-3">Viditelnost profilů</Heading>
        <div className="w-full h-64 relative">
          {data?.counts && <MyPieChart data={data?.counts} dataKey="count" />}
        </div>
      </div>
    </div>
  );
}
