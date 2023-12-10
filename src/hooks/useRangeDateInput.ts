import { ChangeEvent, useEffect, useState } from 'react';

import { dateToString } from '@/utils/dateToString';

export const useRangeDateInput = (
  onInputValue: (dateString: string) => void,
  startDate: Date | null,
  finishDate: Date | null,
) => {
  const numbersOrSlashSymbol = /^[\d\\/]* ?-? ?[\d\\/]*$/;
  const separator = ' - ';

  const [value, setValue] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const dateString = event.target.value;

    if (numbersOrSlashSymbol.test(dateString)) {
      setValue(dateString);
      onInputValue(dateString);
    }
  };

  const onClearInput = () => {
    setValue('');
    onInputValue('');
  };

  useEffect(() => {
    if (startDate && finishDate) {
      const startDateString = dateToString(startDate);
      const finishDateString = dateToString(finishDate);
      setValue(`${startDateString}${separator}${finishDateString}`);
    }
  }, [startDate, finishDate]);

  return {
    value,
    onChange,
    onClearInput,
  };
};
