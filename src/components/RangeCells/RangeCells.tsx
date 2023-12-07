import React, { useContext, useState } from 'react';

import { CellsWrapper } from '@/components/Cells/Cells.styled';
import WeekCells from '@/components/Cells/WeekCells/WeekCells';
import RangeDayCells from '@/components/RangeCells/RangeDayCells/RangeDayCells';
import { TodoList } from '@/components/TodoList/TodoList';
import { RangeDateContext } from '@/context/rangeDateContext';
import { Day } from '@/types/Day';

export interface RangeCellsProps {
  days: Day[];
  weekDays: string[];
  onSetStartDate: (date: Date) => void;
  onSetFinishDate: (date: Date) => void;
  areWeekendsHidden: boolean;
  isStartDateSelect: boolean;
  setIsStartDateSelect: (isStartDateSelect: boolean) => void;
}

export const RangeCells = ({
  days,
  weekDays,
  areWeekendsHidden,
  onSetStartDate,
  onSetFinishDate,
  isStartDateSelect,
  setIsStartDateSelect,
}: RangeCellsProps) => {
  const { startDate } = useContext(RangeDateContext);

  const [isOpenTodoList, setIsOpenTodoList] = useState<boolean>(false);

  const toggleTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  return (
    <CellsWrapper>
      <WeekCells weekDays={weekDays} areWeekendsHidden={areWeekendsHidden} />
      <RangeDayCells
        days={days}
        onSetStartDate={onSetStartDate}
        onSetFinishDate={onSetFinishDate}
        toggleTodoList={toggleTodoList}
        areWeekendsHidden={areWeekendsHidden}
        isStartDateSelect={isStartDateSelect}
        setIsStartDateSelect={setIsStartDateSelect}
      />
      {isOpenTodoList && (
        <TodoList onClose={toggleTodoList} date={startDate!} />
      )}
    </CellsWrapper>
  );
};
