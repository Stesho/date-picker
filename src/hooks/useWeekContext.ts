import { useMemo } from 'react';

import { IWeekContext } from '@/context/weekContext';

export const useWeekContext = ({
  type,
  isStartWithMonday,
  areWeekendsHidden,
  isHolidays,
  country,
}: IWeekContext) =>
  useMemo(
    () => ({
      type,
      isStartWithMonday,
      areWeekendsHidden,
      isHolidays,
      country,
    }),
    [type, isStartWithMonday, areWeekendsHidden, isHolidays, country],
  );
