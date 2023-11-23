import React from 'react';

import { ReactComponent as CalendarIcon } from '@/assets/icons/Calendar.svg';

import styles from './DateInput.module.css';

export const DateInput = () => (
  <div className={styles.datePicker}>
    <CalendarIcon className={styles.calendarIcon} />
    <input className={styles.input} placeholder='Choose Date' />
    <button type='button' className={styles.crossButton}>
      ✖
    </button>
  </div>
);
