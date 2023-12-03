import React, { useContext, useState } from 'react';

import { CellsWrapper } from '@/components/Cells/Cells.styled';
import DayCells from '@/components/Cells/DayCells/DayCells';
import WeekCells from '@/components/Cells/WeekCells/WeekCells';
import { TodoList } from '@/components/TodoList/TodoList';
import { DateContext } from '@/context/dateContext';
import { Day } from '@/types/Day';

export interface CellsProps {
  days: Day[];
  weekDays: string[];
  onSetCurrentDate: (date: Date) => void;
  isStartWithMonday: boolean;
  areWeekendsHidden: boolean;
}

export const Cells = ({
  days,
  weekDays,
  onSetCurrentDate,
  isStartWithMonday,
  areWeekendsHidden,
}: CellsProps) => {
  const { currentDate } = useContext(DateContext);
  const [isOpenTodoList, setIsOpenTodoList] = useState<boolean>(false);

  const toggleTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  return (
    <CellsWrapper>
      <WeekCells
        weekDays={weekDays}
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
