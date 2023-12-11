import { useMemo } from 'react';

import { ICalendarContext } from '@/context/calendarContext';

export const useCalendarContext = ({
  year,
  month,
  week,
  setYear,
  setMonth,
  setWeek,
}: ICalendarContext) =>
  useMemo(
    () => ({
      year,
      month,
      week,
      setYear,
      setMonth,
      setWeek,
    }),
    [year, month, week, setYear, setMonth, setWeek],
  );
