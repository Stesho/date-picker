import React, { Dispatch, useContext } from 'react';

import { CALENDAR_MONTH_NAMES } from '@/constants/calendarMonthNames';
import { DateContext } from '@/context/dateContext';

import {
  ControllersWrapper,
  NextControllerIcon,
  PrevControllerIcon,
} from './Controllers.styled';

interface ControllersProps {
  setMonth: Dispatch<React.SetStateAction<number>>;
  setYear: Dispatch<React.SetStateAction<number>>;
  onSetPrevMonth: () => void;
  onSetNextMonth: () => void;
}

export const Controllers = ({
  setMonth,
  setYear,
  onSetPrevMonth,
  onSetNextMonth,
}: ControllersProps) => {
  const { year, month } = useContext(DateContext);
  const setNextMonth = (): void => {
    if (month === 11) {
      setMonth(0);
      setYear((current) => current + 1);
    } else {
      setMonth((current) => current + 1);
    }

    onSetNextMonth();
  };

  const setPrevMonth = (): void => {
    if (month === 0) {
      setMonth(11);
      setYear((current) => current - 1);
    } else {
      setMonth((current) => current - 1);
    }

    onSetPrevMonth();
  };

  return (
    <ControllersWrapper>
      <PrevControllerIcon onClick={setPrevMonth} />
      <span>
        {CALENDAR_MONTH_NAMES[month]} {year}
      </span>
      <NextControllerIcon onClick={setNextMonth} />
    </ControllersWrapper>
  );
};
