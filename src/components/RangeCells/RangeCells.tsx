import React, { useContext, useState } from 'react';

import { CellsWrapper } from '@/components/Cells/Cells.styled';
import { DayCells } from '@/components/Cells/DayCells/DayCells';
import { WeekCells } from '@/components/Cells/WeekCells/WeekCells';
// import { RangeDayCells } from '@/components/RangeCells/RangeDayCells/RangeDayCells';
import { TodoList } from '@/components/TodoList/TodoList';
import { RangeDateContext } from '@/context/rangeDateContext';
import { CalendarTypes } from '@/types/CalendarTypes';
import { Day } from '@/types/Day';

export interface RangeCellsProps {
  type: CalendarTypes;
  days: Day[];
  weekDays: string[];
  onSetCurrentDate: (selectedDay: number) => () => void;
  isCheckedCell: (isCurrentMoth: boolean, dayNumber: number) => boolean;
  areWeekendsHidden: boolean;
}

export const RangeCells = ({
  type,
  days,
  weekDays,
  areWeekendsHidden,
  onSetCurrentDate,
  isCheckedCell,
}: RangeCellsProps) => {
  const { startDate } = useContext(RangeDateContext);

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
        isCheckedCell={isCheckedCell}
      />
      {isOpenTodoList && (
        <TodoList onClose={toggleTodoList} date={startDate!} />
      )}
    </CellsWrapper>
  );
};
