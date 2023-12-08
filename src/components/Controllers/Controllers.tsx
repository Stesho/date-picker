import React, { Dispatch, SetStateAction, useContext } from 'react';

import { CALENDAR_MONTH_NAMES } from '@/constants/calendar/calendarMonthNames';
import { CalendarContext } from '@/context/calendarContext';

import {
  ControllersWrapper,
  NextControllerIcon,
  PrevControllerIcon,
} from './Controllers.styled';

interface ControllersProps {
  setMonth: Dispatch<SetStateAction<number>>;
  setYear: Dispatch<SetStateAction<number>>;
  setWeek: Dispatch<SetStateAction<number>>;
  onSetPrevMonth?: () => void;
  onSetNextMonth?: () => void;
}

export const Controllers = ({
  setMonth,
  setYear,
  setWeek,
  onSetPrevMonth,
  onSetNextMonth,
}: ControllersProps) => {
  const { year, month, week, weeksInMonth } = useContext(CalendarContext);

  const setNextMonth = (): void => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }

    onSetNextMonth?.();
  };

  const setPrevMonth = (): void => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }

    onSetPrevMonth?.();
  };

  const setPrevWeek = () => {
    if (week === 1) {
      setWeek(weeksInMonth);
      setPrevMonth();
    } else {
      setWeek((prev) => prev - 1);
    }
  };

  const setNextWeek = () => {
    if (week === weeksInMonth) {
      setWeek(1);
      setNextMonth();
    } else {
      setWeek((prev) => prev + 1);
    }
  };

  return (
    <ControllersWrapper>
      <PrevControllerIcon onClick={setPrevWeek} />
      <span>
        {week} week of {CALENDAR_MONTH_NAMES[month]} {year}
      </span>
      <NextControllerIcon onClick={setNextWeek} />
    </ControllersWrapper>
  );
};
