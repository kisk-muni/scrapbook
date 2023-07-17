import {
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  _index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface PieChartProps {
  data: any[];
  dataKey: string;
  showTooltip?: boolean;
}

export default function MyPieChart({
  data,
  dataKey,
  showTooltip,
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey={dataKey}
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
        {showTooltip && (
          <Tooltip
            wrapperStyle={{ outline: 'none' }}
            cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
