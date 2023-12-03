import React, { useContext, useEffect, useState } from 'react';

import { CellsWrapper } from '@/components/Cells/Cells.styled';
import DayCells from '@/components/Cells/DayCells/DayCells';
import WeekCells from '@/components/Cells/WeekCells/WeekCells';
import { TodoList } from '@/components/TodoList/TodoList';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { Day } from '@/types/Day';
import { calculateDaysInMonth } from '@/utils/calculateDaysInMonth';

interface CellsProps {
  onSetCurrentDate: (date: Date) => void;
  isStartWithMonday: boolean;
}

export const Cells = ({ onSetCurrentDate, isStartWithMonday }: CellsProps) => {
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
      setDays([...newDays]);
    }
  };

  useEffect(displayDaysInCurrentMonth, [
    month,
    year,
    isStartWithMonday,
    minDate,
    maxDate,
  ]);

  return (
    <CellsWrapper>
      <WeekCells isStartWithMonday={isStartWithMonday} />
      <DayCells
        days={days}
        onSetCurrentDate={onSetCurrentDate}
        toggleTodoList={toggleTodoList}
      />
      {isOpenTodoList && (
        <TodoList onClose={toggleTodoList} date={currentDate!} />
      )}
    </CellsWrapper>
  );
};
