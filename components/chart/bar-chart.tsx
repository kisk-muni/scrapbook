import {
  BarChart as Bch,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface BarChartProps {
  data: any;
  dataKey: string;
  category: string;
  showTooltip?: boolean;
}

export default function BarChart({
  data,
  dataKey,
  category,
  showTooltip,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Bch
        data={data}
        margin={{
          right: 30,
          left: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
        />
        <XAxis
          dataKey={dataKey}
          tick={{ transform: 'translate(0, 6)' }}
          scale="point"
          interval="preserveStartEnd"
          tickLine={false}
          axisLine={false}
          style={{
            fontSize: '14px',
          }}
          padding={{ left: 16, right: 10 }}
          minTickGap={6}
        />
        <YAxis domain={[0, 'auto']} hide={true} />
        {showTooltip && (
          <Tooltip
            wrapperStyle={{ outline: 'none' }}
            cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
          />
        )}
        <Bar dataKey={category} fill="#00a4ff" />
      </Bch>
    </ResponsiveContainer>
  );
}
