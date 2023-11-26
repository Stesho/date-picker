import React, { useState } from 'react';

import { Calendar } from '@/components/Calendar/Calendar';
import { DateInput } from '@/components/DateInput/DateInput';
import { ResetStyles } from '@/styles/reset';

export const Datepicker = () => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const toggleCalendar = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  return (
    <div>
      <ResetStyles />
      <DateInput toggleCalendar={toggleCalendar} />
      {isOpenCalendar && <Calendar initialDate={new Date(2024, 11, 5)} />}
    </div>
  );
};
