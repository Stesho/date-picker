import React, { useContext, useMemo, useState } from 'react';

import { CalendarWrapper } from '@/components/Calendar/Calendar.styled';
import { Controllers } from '@/components/Controllers/Controllers';
import { RangeCells } from '@/components/RangeCells/RangeCells';
import { WEEK_DAYS_NAMES } from '@/constants/calendar/weekDaysNames';
import { CalendarContext } from '@/context/calendarContext';
import { RangeDateContext } from '@/context/rangeDateContext';
import { WeekContext } from '@/context/weekContext';
import { useDays } from '@/hooks/useDays';
import { configurationService } from '@/services/configurationService';

interface RangeCalendarProps {
  setStartDate: (date: Date) => void;
  setFinishDate: (date: Date) => void;
}

export const RangeCalendar = ({
  setStartDate,
  setFinishDate,
}: RangeCalendarProps) => {
  const { startDate, minDate, maxDate } = useContext(RangeDateContext);
  const { isStartWithMonday, areWeekendsHidden, isHolidays, country } =
    useContext(WeekContext);

  const initialYear = startDate?.getFullYear();
  const initialMonth = startDate?.getMonth();

  const [year, setYear] = useState<number>(
    () => initialYear || new Date().getFullYear(),
  );
  const [month, setMonth] = useState<number>(
    () => initialMonth || new Date().getMonth(),
  );
  const [days] = useDays(year, month);
  const [isStartDateSelect, setIsStartDateSelect] = useState(true);

  const onSetStartDate = (date: Date) => {
    setStartDate(date);
  };

  const onSetFinishDate = (date: Date) => {
    setFinishDate(date);
  };

  const dateContext = useMemo(
    () => ({
      year,
      month,
    }),
    [year, month],
  );

  const CalendarBody = configurationService({
    element: RangeCells,
    year,
    isHolidays,
    isStartWithMonday,
    areWeekendsHidden,
    minDate,
    maxDate,
    country,
  });

  return (
    <CalendarWrapper>
      <CalendarContext.Provider value={dateContext}>
        <Controllers setMonth={setMonth} setYear={setYear} />
        <CalendarBody
          year={year}
          month={month}
          days={days}
          minDate={minDate}
          maxDate={maxDate}
          weekDays={WEEK_DAYS_NAMES}
          areWeekendsHidden={areWeekendsHidden!}
          onSetStartDate={onSetStartDate}
          onSetFinishDate={onSetFinishDate}
          isStartDateSelect={isStartDateSelect}
          setIsStartDateSelect={setIsStartDateSelect}
          country={country}
        />
      </CalendarContext.Provider>
    </CalendarWrapper>
  );
};
