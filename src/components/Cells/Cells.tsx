import React, { useContext, useState } from 'react';

import { CellsWrapper } from '@/components/Cells/Cells.styled';
import { DayCells } from '@/components/Cells/DayCells/DayCells';
import { WeekCells } from '@/components/Cells/WeekCells/WeekCells';
import { TodoList } from '@/components/TodoList/TodoList';
import { DateContext } from '@/context/dateContext';
import { CalendarTypes } from '@/types/CalendarTypes';
import { Day } from '@/types/Day';

export interface CellsProps {
  type: CalendarTypes;
  days: Day[];
  weekDays: string[];
  onSetCurrentDate: (date: Date) => void;
  areWeekendsHidden: boolean;
}

export const Cells = ({
  type,
  days,
  weekDays,
  onSetCurrentDate,
  areWeekendsHidden,
}: CellsProps) => {
  const { currentDate } = useContext(DateContext);
  const [isOpenTodoList, setIsOpenTodoList] = useState<boolean>(false);

  const toggleTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  return (
    <CellsWrapper>
      <WeekCells weekDays={weekDays} areWeekendsHidden={areWeekendsHidden} />
      <DayCells
        type={type}
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
