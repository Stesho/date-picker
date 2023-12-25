import React from 'react';

export const emptyProps = {
  days: [],
  weekDays: [],
  currentDate: null,
  startDate: null,
  finishDate: null,
  setCurrentDate: () => {
    throw new Error('Function not implemented.');
  },
  setStartDate: () => {
    throw new Error('Function not implemented.');
  },
  setFinishDate: () => {
    throw new Error('Function not implemented.');
  },
  onSetCurrentDate: () => {
    throw new Error('Function not implemented.');
  },
  isCheckedCell: () => {
    throw new Error('Function not implemented.');
  },
  onPrevClick: () => {
    throw new Error('Function not implemented.');
  },
  onNextClick: () => {
    throw new Error('Function not implemented.');
  },
  controllersCaption: '',
  errorMessage: '',
  isOpenCalendar: false,
};
