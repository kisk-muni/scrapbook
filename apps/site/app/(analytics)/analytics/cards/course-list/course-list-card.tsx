'use client';
import useApi from 'lib/use-api';
import useAnalyticsGlobalFilter from '../../../../../lib/hooks/use-analytics-global-filter';
import Heading from '../../heading';
import MyPieChart from '../../../../../components/chart/pie-chart';
import { PrivateProfilesShareApiResult } from '../private-profiles-share/route';

export default function CourseListCard() {
  const { filterData, password } = useAnalyticsGlobalFilter();
  const { data } = useApi<PrivateProfilesShareApiResult>(
    '/analytics/cards/private-profiles-share' +
      '?p=' +
      password +
      '&cohort=' +
      filterData.cohort
  );

  return (
    <div>
      <div className="rounded-lg overflow-hidden bg-white px-2 pt-4 pb-6 mt-6">
        <Heading className="px-4 mb-3">Příspěvky dle předmětů</Heading>
        <div className="w-full h-64 relative">
          {data?.counts && <MyPieChart data={data?.counts} dataKey="count" />}
        </div>
      </div>
    </div>
  );
}
