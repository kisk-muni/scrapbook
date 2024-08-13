import {
  formatISO9075,
  formatISO,
  startOfToday,
  startOfYear,
  Duration,
  format,
  intervalToDuration,
  isBefore,
  sub,
  eachWeekOfInterval,
} from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

export type ServerDateInterval = {
  start: Date;
  end: Date;
};

export type Bar = {
  name: string;
  value: number;
};

export function getPreviousInterval(interval: ServerDateInterval) {
  const duration = intervalToDuration(interval);
  const prevEnd = sub(interval.start, { days: 1 });
  const prevStart = sub(prevEnd, duration);
  return { start: prevStart, end: prevEnd };
}

export function range(interval: ServerDateInterval) {
  return `[${formatISO9075(interval.start)}, ${formatISO9075(interval.end)}]`;
}

export function rangesForComparison(interval: ServerDateInterval) {
  const prevInterval = getPreviousInterval(interval);
  const currentRange = range(interval);
  const compareRange = range(prevInterval);
  const totalRange = range({ start: prevInterval.start, end: interval.end });
  return {
    currentRange,
    compareRange,
    totalRange,
  };
}

export function delta(current: number, prev = 0) {
  if (prev == 0) return 0;
  return current / prev - 1;
}

export enum DeltaType {
  Increase = 'increase',
  ModerateIncrease = 'moderateIncrease',
  Decrease = 'decrease',
  ModerateDecrease = 'moderateDecrease',
  Unchanged = 'unchanged',
}

export function deltaType(delta: number): DeltaType {
  if (delta >= 0.1) return DeltaType.Increase;
  if (delta > 0) return DeltaType.ModerateIncrease;
  if (delta === 0) return DeltaType.Unchanged;
  if (delta <= -0.1) return DeltaType.Decrease;
  return DeltaType.ModerateDecrease;
}

export const allowedGranularity = ['year', 'week', 'month', 'day', 'hour'];
export type Granularity = (typeof allowedGranularity)[number];

export function granularDateTime(
  date: string,
  duration: Duration,
  today: Date,
  thisYear: Date
): string {
  // https://date-fns.org/v2.29.3/docs/format
  const dateObj = new Date(date);
  return format(
    dateObj,
    ((): string => {
      if (isBefore(dateObj, thisYear)) {
        if (duration.years) return 'yy';
        if (duration.months >= 3) return 'd MMM yy';
        if (duration.days > 1) return 'd MMM yy';
      }
      if (duration.years) return 'y';
      if (duration.months >= 3) return 'MMM';
      if (duration.months > 1) return 'd MM';
      if (duration.days > 1) return 'd MMM ';
    })()
  );
}

export function granularityForInterval(duration: Duration): Granularity {
  if (duration.years >= 1) return 'year';
  if (duration.months >= 3) return 'month';
  if (duration.days > 1) return 'day';
  if (duration.days <= 1) return 'hour';
  return 'day';
}

export type ChartPoint = { [key: string]: number | string };

export type ChartDataCategory = {
  name: string;
  unit: 'seconds' | 'percentage' | 'number';
};

export type ChartData = {
  points: ChartPoint[];
  key: string;
  categories: ChartDataCategory[];
};

export function inTime(
  dateInterval: ServerDateInterval,
  granularity?: Granularity
) {
  const duration = intervalToDuration(dateInterval);
  const today = startOfToday();
  const thisYear = startOfYear(today);
  const gran = granularity ? granularity : granularityForInterval(duration);
  const interval = '1 ' + gran;
  const { currentRange } = rangesForComparison(dateInterval);
  const startDateString = formatISO(dateInterval.start);
  const endDateString = formatISO(dateInterval.end);
  const key = gran.charAt(0).toUpperCase() + gran.slice(1);
  return {
    duration,
    today,
    thisYear,
    granularity: gran,
    interval,
    currentRange,
    startDateString,
    endDateString,
    key,
  };
}

// https://github.com/date-fns/date-fns/issues/2181#issuecomment-1850361939
export function eachWeekOfIntervalInTimezone({
  start,
  end,
  timezone,
}: {
  start: Date;
  end: Date;
  timezone: string;
}) {
  const days = eachWeekOfInterval(
    {
      start: toZonedTime(start, timezone),
      end: toZonedTime(end, timezone),
    },
    {
      weekStartsOn: 2,
    }
  );

  return days.map((day) => fromZonedTime(day, timezone));
}
