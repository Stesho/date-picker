import React, {
  ComponentType,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { RangeDateContext } from '@/context/rangeDateContext';
import { WeekContext } from '@/context/weekContext';
import { useRangeDateInput } from '@/hooks/useRangeDateInput';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';
import { addDayToDate } from '@/utils/addDayToDate';
import { isValidDateString } from '@/utils/isValidDateString';
import { parseDateString } from '@/utils/parseDateString';

export const withRangepickerLogic = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: T) {
    const {
      type,
      initialStartDate,
      initialFinishDate,
      minDate,
      maxDate,
      isStartWithMonday,
      areWeekendsHidden,
      isHolidays,
      country = 'BY',
      ...rest
    } = props as T;
    const yesterday = addDayToDate(new Date(), -1);
    const tomorrow = addDayToDate(new Date(), 1);

    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(
      initialStartDate || yesterday,
    );
    const [finishDate, setFinishDate] = useState<Date | null>(
      initialFinishDate || tomorrow,
    );
    const [errorMessage, setErrorMessage] = useState('');

    const separator = ' - ';

    const setDate = (
      date: string,
      setNewDate: Dispatch<SetStateAction<Date | null>>,
    ) => {
      if (isValidDateString(date)) {
        setNewDate(date.trim() !== '' ? parseDateString(date) : null);
        setErrorMessage('');
      } else {
        setNewDate(null);
        setErrorMessage('Date should be in format dd/mm/yyyy - dd/mm/yyyy');
      }
    };

    const onInputValue = useCallback(
      (dateString: string) => {
        const [start, finish] = dateString.split(separator);
        setDate(start, setStartDate);
        setDate(finish, setFinishDate);

        if (startDate && finishDate && startDate > finishDate) {
          setErrorMessage('Start date should be less than finish date');
        }
      },
      [startDate, finishDate],
    );

    const { value, onClearInput, onChange } = useRangeDateInput(
      onInputValue,
      startDate,
      finishDate,
    );

    const toggleCalendar = () => {
      setIsOpenCalendar(!isOpenCalendar);
    };

    const dateContext = useMemo(
      () => ({
        startDate,
        finishDate,
        minDate,
        maxDate,
      }),
      [startDate, finishDate, minDate, maxDate],
    );

    const weekContext = useMemo(
      () => ({
        isStartWithMonday,
        areWeekendsHidden,
        isHolidays,
        country,
      }),
      [isStartWithMonday, areWeekendsHidden, isHolidays, country],
    );

    return (
      <RangeDateContext.Provider value={dateContext}>
        <WeekContext.Provider value={weekContext}>
          <WrappedComponent
            {...(rest as T)}
            isOpenCalendar={isOpenCalendar}
            errorMessage={errorMessage}
            toggleCalendar={toggleCalendar}
            type={type}
            setStartDate={setStartDate}
            setFinishDate={setFinishDate}
            value={value}
            onClearInput={onClearInput}
            onChange={onChange}
          />
        </WeekContext.Provider>
      </RangeDateContext.Provider>
    );
  };
