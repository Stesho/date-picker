import React, { useContext } from 'react';

import { DayCells, DayCellsProps } from '@/components/Cells/DayCells/DayCells';
import {
  WeekCells,
  WeekCellsProps,
} from '@/components/Cells/WeekCells/WeekCells';
import { TodoList } from '@/components/TodoList/TodoList';
import { DateContext } from '@/context/dateContext';
import { useTodos } from '@/hooks/useTodos';

import { CellsWrapper } from './Cells.styled';

export type CellsProps = WeekCellsProps & Omit<DayCellsProps, 'toggleTodoList'>;

export const Cells = ({
  days,
  weekDays,
  onSetCurrentDate,
  isCheckedCell,
}: CellsProps) => {
  const { currentDate, startDate } = useContext(DateContext);
  const { isOpenTodoList, toggleTodoList } = useTodos();

  return (
    <CellsWrapper>
      <WeekCells weekDays={weekDays} />
      <DayCells
        days={days}
        onSetCurrentDate={onSetCurrentDate}
        toggleTodoList={toggleTodoList}
        isCheckedCell={isCheckedCell}
      />
      {isOpenTodoList && (
        <TodoList onClose={toggleTodoList} date={currentDate! || startDate!} />
      )}
    </CellsWrapper>
  );
};
