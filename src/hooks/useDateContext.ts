import { useMemo } from 'react';

import { IDateContext } from '@/context/dateContext';

export const useDateContext = ({
  currentDate,
  startDate,
  finishDate,
  minDate,
  maxDate,
  setCurrentDate,
  setStartDate,
  setFinishDate,
}: IDateContext) =>
  useMemo(
    () => ({
      currentDate,
      startDate,
      finishDate,
      minDate,
      maxDate,
      setCurrentDate,
      setStartDate,
      setFinishDate,
    }),
    [
      currentDate,
      setCurrentDate,
      startDate,
      finishDate,
      minDate,
      maxDate,
      setStartDate,
      setFinishDate,
    ],
  );
