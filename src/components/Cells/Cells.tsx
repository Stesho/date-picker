import React, { useEffect, useState } from 'react';

import { CellsWrapper } from '@/components/Cells/Cells.styled';
import DayCells from '@/components/Cells/DayCells/DayCells';
import WeekCells from '@/components/Cells/WeekCells/WeekCells';
import { TodoList } from '@/components/TodoList/TodoList';
import { Day } from '@/types/Day';
import { calculateDaysInMonth } from '@/utils/calculateDaysInMonth';

interface CellsProps {
  year: number;
  month: number;
  currentDate: Date | null;
  onSetCurrentDate: (date: Date) => void;
  isStartWithMonday: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export const Cells = ({
  year,
  month,
  currentDate,
  onSetCurrentDate,
  minDate,
  maxDate,
  isStartWithMonday,
}: CellsProps) => {
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
        year={year}
        month={month}
        currentDate={currentDate}
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
