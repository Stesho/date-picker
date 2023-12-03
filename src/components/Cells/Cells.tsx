import React, { useContext, useEffect, useState } from 'react';

import { CellsWrapper } from '@/components/Cells/Cells.styled';
import DayCells from '@/components/Cells/DayCells/DayCells';
import WeekCells from '@/components/Cells/WeekCells/WeekCells';
import { TodoList } from '@/components/TodoList/TodoList';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { Day } from '@/types/Day';
import { calculateDaysInMonth } from '@/utils/calculateDaysInMonth';
import { cutWeekends } from '@/utils/cutWeekends';

interface CellsProps {
  onSetCurrentDate: (date: Date) => void;
  isStartWithMonday: boolean;
  areWeekendsHidden: boolean;
}

export const Cells = ({
  onSetCurrentDate,
  isStartWithMonday,
  areWeekendsHidden,
}: CellsProps) => {
  const { currentDate, minDate, maxDate } = useContext(DateContext);
  const { year, month } = useContext(CalendarContext);

  const [days, setDays] = useState<Day[]>([]);
  const [isOpenTodoList, setIsOpenTodoList] = useState<boolean>(false);

  const toggleTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  const displayDaysInCurrentMonth = (): void => {
    const newDays = calculateDaysInMonth({
      year,
      month,
      isStartWithMonday,
      minDate,
      maxDate,
    });

    if (newDays) {
      const weekendCalculatedDays = areWeekendsHidden
        ? cutWeekends(newDays, isStartWithMonday)
        : newDays;
      setDays([...weekendCalculatedDays]);
    }
  };

  useEffect(displayDaysInCurrentMonth, [
    month,
    year,
    isStartWithMonday,
    areWeekendsHidden,
    minDate,
    maxDate,
  ]);

  return (
    <CellsWrapper>
      <WeekCells
        isStartWithMonday={isStartWithMonday}
        areWeekendsHidden={areWeekendsHidden}
      />
      <DayCells
        days={days}
        onSetCurrentDate={onSetCurrentDate}
        toggleTodoList={toggleTodoList}
        areWeekendsHidden={areWeekendsHidden}
      />
      {isOpenTodoList && (
        <TodoList onClose={toggleTodoList} date={currentDate!} />
      )}
    </CellsWrapper>
  );
};
