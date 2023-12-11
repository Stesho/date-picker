import { Dispatch, SetStateAction, useState } from 'react';

import { errorMessages } from '@/constants/errorMessages/errorMessages';
import { addDayToDate } from '@/utils/addDayToDate';
import { isValidDateString } from '@/utils/isValidDateString';
import { parseDateString } from '@/utils/parseDateString';

const yesterday = addDayToDate(new Date(), -1);
const tomorrow = addDayToDate(new Date(), 1);
const separator = ' - ';

export const useRangeDate = (
  initialStartDate?: Date,
  initialFinishDate?: Date,
) => {
  const [startDate, setStartDate] = useState<Date | null>(
    initialStartDate || yesterday,
  );
  const [finishDate, setFinishDate] = useState<Date | null>(
    initialFinishDate || tomorrow,
  );
  const [errorMessage, setErrorMessage] = useState('');

  const setDate = (
    date: string,
    setNewDate: Dispatch<SetStateAction<Date | null>>,
  ) => {
    if (isValidDateString(date)) {
      setNewDate(date.trim() !== '' ? parseDateString(date) : null);
      setErrorMessage('');
    } else {
      setNewDate(null);
      setErrorMessage(errorMessages.rangepickerFormat);
    }
  };

  const onInputValue = (dateString: string) => {
    const [start, finish] = dateString.split(separator);
    setDate(start, setStartDate);
    setDate(finish, setFinishDate);

    if (startDate && finishDate && startDate > finishDate) {
      setErrorMessage(errorMessages.datesValidation);
    }
  };

  return {
    startDate,
    finishDate,
    errorMessage,
    onInputValue,
    setStartDate,
    setFinishDate,
  };
};
