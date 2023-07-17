import classNames from 'classnames';
import Tooltip from '../tooltip';

type IndicatorProps = {
  categories: {
    name: string;
    value: number;
    label: string;
    color: string;
  }[];
};

export default function Indicator({ categories }: IndicatorProps) {
  const total = categories.reduce((acc, curr) => acc + curr.value, 0);
  return (
    <div
      className="relative flex w-[150px] h-4"
      style={{
        transform: 'translateZ(0)',
      }}
    >
      {categories
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category, index) => {
          const percentage = (category.value / total) * 100;
          return (
            <Tooltip
              key={index}
              delayDuration={0}
              text={`${category.label} ${percentage.toFixed(1)} %`}
            >
              <div
                className={classNames('h-full', category.color, {
                  'rounded-l-full': index === 0,
                  'rounded-r-full': index === categories.length - 1,
                })}
                style={{ width: `${100 - percentage}%` }}
              ></div>
            </Tooltip>
          );
        })}
    </div>
  );
}
