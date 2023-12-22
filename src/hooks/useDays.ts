import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { DateContext } from '@/context/dateContext';
import { WeekContext } from '@/context/weekContext';
import { Day } from '@/types/Day';
import { getDaysInMonth } from '@/utils/calendar/calculateDaysInMonth';

type UseDaysReturnType = [Day[], Dispatch<SetStateAction<Day[]>>];

export const useDays = (year: number, month: number): UseDaysReturnType => {
  const { minDate, maxDate } = useContext(DateContext);
  const { isStartWithMonday, areWeekendsHidden } = useContext(WeekContext);

  const [days, setDays] = useState<Day[]>([]);

  const calculateDaysInCurrentMonth = (): void => {
    const newDays = getDaysInMonth({
      year,
      month,
      minDate,
      maxDate,
    });

    if (newDays) {
      setDays([...newDays]);
    }
  };

  useEffect(calculateDaysInCurrentMonth, [
    month,
    year,
    isStartWithMonday,
    areWeekendsHidden,
    minDate,
    maxDate,
  ]);

  return [days, setDays];
};
