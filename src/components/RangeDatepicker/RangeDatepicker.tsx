import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { RangeDateInput } from '@/components/RangeDateInput/RangeDateInput';
import { ResetStyles } from '@/styles/reset';
import { DatepickerParams } from '@/types/DatepickerParams';
import { isValidDateString } from '@/utils/isValidDateString';
import { parseDateString } from '@/utils/parseDateString';

interface RangeDatepickerProps extends DatepickerParams {
  initialStartDate?: Date;
  initialFinishDate?: Date;
}

export const RangeDatepicker = ({
  initialStartDate,
  initialFinishDate,
}: RangeDatepickerProps) => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [startDate, setStartDate] = useState(initialStartDate || null);
  const [finishDate, setFinishDate] = useState(initialFinishDate || null);
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
      setErrorMessage('Date should be in format dd/mm/yyyy');
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

  return (
    <div>
      <ResetStyles />
      <RangeDateInput
        startDate={startDate}
        finishDate={finishDate}
        toggleCalendar={toggleCalendar}
        onInputValue={onInputValue}
        isError={errorMessage.length > 0}
      />
      {errorMessage.length > 0 && <span>{errorMessage}</span>}
    </div>
  );
};
