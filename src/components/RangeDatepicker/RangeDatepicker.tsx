import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { RangeCalendar } from '@/components/RangeCalendar/RangeCalendar';
import { RangeDateInput } from '@/components/RangeDateInput/RangeDateInput';
import { RangeDateContext } from '@/context/rangeDateContext';
import { WeekContext } from '@/context/weekContext';
import { ResetStyles } from '@/styles/reset';
import { CalendarTypes } from '@/types/CalendarTypes';
import { DatepickerParams } from '@/types/DatepickerParams';
import { addDayToDate } from '@/utils/addDayToDate';
import { isValidDateString } from '@/utils/isValidDateString';
import { parseDateString } from '@/utils/parseDateString';

interface RangeDatepickerProps extends DatepickerParams {
  initialStartDate?: Date;
  initialFinishDate?: Date;
}

export const RangeDatepicker = ({
  type = CalendarTypes.Month,
  initialStartDate,
  initialFinishDate,
  minDate,
  maxDate,
  isStartWithMonday = false,
  areWeekendsHidden = false,
  isHolidays = false,
  country = 'BY',
}: RangeDatepickerProps) => {
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
    <div>
      <RangeDateContext.Provider value={dateContext}>
        <WeekContext.Provider value={weekContext}>
          <ResetStyles />
          <RangeDateInput
            startDate={startDate}
            finishDate={finishDate}
            toggleCalendar={toggleCalendar}
            onInputValue={onInputValue}
            isError={errorMessage.length > 0}
          />
          {errorMessage.length > 0 && <span>{errorMessage}</span>}
          {isOpenCalendar && (
            <RangeCalendar
              type={type}
              setStartDate={setStartDate}
              setFinishDate={setFinishDate}
            />
          )}
        </WeekContext.Provider>
      </RangeDateContext.Provider>
    </div>
  );
};
