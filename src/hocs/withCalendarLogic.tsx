import React, {
  ComponentType,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { WEEK_DAYS_NAMES } from '@/constants/calendar/weekDaysNames';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { WeekContext } from '@/context/weekContext';
import { useDays } from '@/hooks/useDays';
import { configurationService } from '@/services/configurationService';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

export const withCalendarLogic = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: Omit<T, keyof ConfigurableElementProps>) {
    const { type, setCurrentDate, ...rest } = props as T;

    const { currentDate, minDate, maxDate } = useContext(DateContext);
    const { isStartWithMonday, areWeekendsHidden, isHolidays, country } =
      useContext(WeekContext);

    const initialYear = currentDate?.getFullYear();
    const initialMonth = currentDate?.getMonth();

    const [year, setYear] = useState<number>(
      () => initialYear || new Date().getFullYear(),
    );
    const [month, setMonth] = useState<number>(
      () => initialMonth || new Date().getMonth(),
    );
    const [week, setWeek] = useState<number>(1);
    const [days] = useDays(year, month);

    const onSetCurrentDate = (date: Date) => {
      setCurrentDate(date);
    };

    useEffect(() => {
      if (currentDate) {
        setYear(currentDate.getFullYear());
        setMonth(currentDate.getMonth());
      }
    }, [currentDate]);

    const calendarContext = useMemo(
      () => ({
        year,
        month,
        week,
      }),
      [year, month, week],
    );

    const CalendarBodyWrapper = configurationService({
      element: WrappedComponent,
      year,
      isHolidays,
      isStartWithMonday,
      areWeekendsHidden,
      minDate,
      maxDate,
      country,
    });

    return (
      <CalendarContext.Provider value={calendarContext}>
        <CalendarBodyWrapper
          {...(rest as T)}
          year={year}
          month={month}
          days={days}
          minDate={minDate}
          maxDate={maxDate}
          weekDays={WEEK_DAYS_NAMES}
          areWeekendsHidden={areWeekendsHidden!}
          onSetCurrentDate={onSetCurrentDate}
          country={country}
          setMonth={setMonth}
          setYear={setYear}
          setWeek={setWeek}
          type={type}
          week={week}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </CalendarContext.Provider>
    );
  };