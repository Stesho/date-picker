import React, { useEffect, useState } from 'react';

import { ReactComponent as NextIcon } from '@/assets/icons/Next.svg';
import { ReactComponent as PrevIcon } from '@/assets/icons/Prev.svg';
import { CALENDAR_MONTH_NAMES } from '@/constants/calendarMonthNames';
import { Day } from '@/types/Day';
import { calculateDaysInMonth } from '@/utils/calculateDaysInMonth';

import styles from './Calendar.module.css';

export const Calendar = () => {
  const [year, setYear] = useState<number>(2023);
  const [month, setMonth] = useState<number>(9);
  const [days, setDays] = useState<Day[]>([]);

  const displayDaysInCurrentMonth = (): void => {
    const newDays = calculateDaysInMonth(year, month);
    if (newDays) {
      setDays([...newDays]);
    }
  };

  const setNextMonth = (): void => {
    if (month === 11) {
      setMonth(0);
      setYear((current) => current + 1);
    } else {
      setMonth((current) => current + 1);
    }
  };

  const setPrevMonth = (): void => {
    if (month === 0) {
      setMonth(11);
      setYear((current) => current - 1);
    } else {
      setMonth((current) => current - 1);
    }
  };

  useEffect(displayDaysInCurrentMonth, [month, year]);

  return (
    <div className={styles.calendar}>
      <div className={styles.month}>
        <PrevIcon onClick={setPrevMonth} />
        <span>
          {CALENDAR_MONTH_NAMES[month]} {year}
        </span>
        <NextIcon onClick={setNextMonth} />
      </div>
      <div className={styles.weekDays}>
        <div className={styles.weekDay}>Su</div>
        <div className={styles.weekDay}>Mo</div>
        <div className={styles.weekDay}>Tu</div>
        <div className={styles.weekDay}>We</div>
        <div className={styles.weekDay}>Th</div>
        <div className={styles.weekDay}>Fr</div>
        <div className={styles.weekDay}>Sa</div>
      </div>
      <div className={styles.days}>
        {days.map((item, index) => (
          <div
            key={`${item.number}-${item.isCurrentMoth}`}
            className={styles.day}
          >
            <input
              type='radio'
              name='day'
              id={`${index}${item.number}`}
              disabled={!item.isCurrentMoth}
            />
            <label htmlFor={`${index}${item.number}`}>{item.number}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
