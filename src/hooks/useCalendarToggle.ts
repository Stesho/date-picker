import { useState } from 'react';

export const useCalendarToggle = () => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const toggleCalendar = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  return {
    isOpenCalendar,
    toggleCalendar,
  };
};
