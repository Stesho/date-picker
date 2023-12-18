import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { WEEK_DAYS_NAMES } from '@/constants/calendar/weekDaysNames';
import { errorMessages } from '@/constants/errorMessages/errorMessages';
import { CalendarTypes } from '@/types/CalendarTypes';
import { shiftArrayToLeft } from '@/utils/shiftArrayToLeft';

import 'jest-styled-components';
import '@testing-library/jest-dom';

import { Datepicker, DatepickerProps } from './Datepicker';

describe('Datepicker', () => {
  let options: DatepickerProps;

  beforeEach(() => {
    options = {
      type: CalendarTypes.Month,
      initialDate: undefined,
      minDate: undefined,
      maxDate: undefined,
      isStartWithMonday: false,
      areWeekendsHidden: false,
      isHolidays: false,
    };
  });

  it('should correctly render default datepicker', () => {
    const { container } = render(<Datepicker {...options} />);
    expect(container).toBeInTheDocument();
  });

  it('should open calendar by clicking calendar icon', () => {
    const { getByTestId } = render(<Datepicker {...options} />);
    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const calendar = getByTestId('calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('should select initial date', () => {
    const dayNumber = 5;
    const cellIndex = 9;
    options.initialDate = new Date(2023, 11, dayNumber);

    const { getByTestId } = render(<Datepicker {...options} />);
    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const selectedDate = getByTestId(`${cellIndex}${dayNumber}`);

    expect(selectedDate).toBeChecked();
  });

  it('should change selected date when input value', () => {
    const dayNumber = 5;
    const cellIndex = 9;
    const newDate = `${dayNumber.toString().padStart(2, '0')}/12/2023`;

    const { getByTestId } = render(<Datepicker {...options} />);

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const input = getByTestId('dateInput') as HTMLInputElement;
    fireEvent.change(input, { target: { value: newDate } });

    const selectedDate = getByTestId(`${cellIndex}${dayNumber}`);

    expect(input.value).toBe('05/12/2023');
    expect(selectedDate).toBeChecked();
  });

  it('should change input value when new date selected', () => {
    const dayNumber = 25;
    const cellIndex = 29;
    const newDate = `${dayNumber.toString().padStart(2, '0')}/12/2023`;
    const { getByTestId } = render(<Datepicker {...options} />);

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const selectedDate = getByTestId(`${cellIndex}${dayNumber}`);
    fireEvent.click(selectedDate);

    const input = getByTestId('dateInput') as HTMLInputElement;

    expect(input.value).toBe(newDate);
    expect(selectedDate).toBeChecked();
  });

  it('should change month by previous month controller clicking', () => {
    options.initialDate = new Date(2023, 9, 12);
    const { getByTestId } = render(<Datepicker {...options} />);

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const input = getByTestId('dateInput') as HTMLInputElement;
    const prevInputValue = input.value;

    const prevMonthController = getByTestId('prevController');
    fireEvent.click(prevMonthController);

    const currentInputValue = input.value;

    expect(prevInputValue).toBe('12/10/2023');
    expect(currentInputValue).toBe('12/09/2023');
  });

  it('should change month by next month controller clicking', () => {
    options.initialDate = new Date(2023, 9, 12);
    const { getByTestId } = render(<Datepicker {...options} />);

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const input = getByTestId('dateInput') as HTMLInputElement;
    const prevInputValue = input.value;

    const nextMonthController = getByTestId('nextController');
    fireEvent.click(nextMonthController);

    const currentInputValue = input.value;

    expect(prevInputValue).toBe('12/10/2023');
    expect(currentInputValue).toBe('12/11/2023');
  });

  it('should show error message if date format is invalid', () => {
    const invalidDateFormat = '5/2/23';
    const { getByTestId, getByText } = render(<Datepicker {...options} />);

    const input = getByTestId('dateInput') as HTMLInputElement;
    fireEvent.change(input, { target: { value: invalidDateFormat } });

    const errorMessage = getByText(errorMessages.datepickerFormat);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should show error message if date value is invalid', () => {
    const invalidDateValue = '05/13/2023';
    const { getByTestId, getByText } = render(<Datepicker {...options} />);

    const input = getByTestId('dateInput') as HTMLInputElement;
    fireEvent.change(input, { target: { value: invalidDateValue } });

    const errorMessage = getByText(errorMessages.datesValidation());

    expect(errorMessage).toBeInTheDocument();
  });

  it('should clear input value by cross button clicking', () => {
    options.initialDate = new Date(2023, 5, 12);
    const { getByTestId, getByText } = render(<Datepicker {...options} />);

    const input = getByTestId('dateInput') as HTMLInputElement;
    const prevInputValue = input.value;

    const crossButton = getByText('✖');
    fireEvent.click(crossButton);

    const currentInputValue = input.value;

    expect(prevInputValue).toBe('12/06/2023');
    expect(currentInputValue).toBe('');
  });

  it('should move cells to the left if isStartWithMonday props is true', () => {
    options.isStartWithMonday = true;
    const { getByTestId, getAllByTestId } = render(<Datepicker {...options} />);

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const weekCells = getAllByTestId('weekCell').map((el) => el.textContent);

    expect(weekCells).toEqual(shiftArrayToLeft(WEEK_DAYS_NAMES, 1));
  });

  it('should remove weekends cells if areWeekendsHidden props is true', () => {
    options.areWeekendsHidden = true;
    const { getByTestId, getAllByTestId } = render(<Datepicker {...options} />);

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const weekCells = getAllByTestId('weekCell').map((el) => el.textContent);
    const noWeekendsCells = shiftArrayToLeft(WEEK_DAYS_NAMES, 1).slice(0, 5);

    expect(weekCells).toEqual(noWeekendsCells);
  });

  it('should forbid to select date less than minimal date', () => {
    options.initialDate = new Date(2023, 11, 15);
    options.minDate = new Date(2023, 11, 11);

    const { getByTestId, getByText } = render(<Datepicker {...options} />);

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const input = getByTestId('dateInput') as HTMLInputElement;
    const prevInputValue = input.value;

    const forbiddenCell = getByText('9');
    fireEvent.click(forbiddenCell);

    const currentInputValue = input.value;

    expect(prevInputValue).toBe(currentInputValue);
    expect(forbiddenCell).not.toBeChecked();
  });

  it('should forbid to select date bigger than maximum date', () => {
    options.initialDate = new Date(2023, 11, 15);
    options.maxDate = new Date(2023, 11, 17);

    const { getByTestId, getByText } = render(<Datepicker {...options} />);

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const input = getByTestId('dateInput') as HTMLInputElement;
    const prevInputValue = input.value;

    const forbiddenCell = getByText('20');
    fireEvent.click(forbiddenCell);

    const currentInputValue = input.value;

    expect(prevInputValue).toBe(currentInputValue);
    expect(forbiddenCell).not.toBeChecked();
  });

  it('should open todolist by double click on cell', () => {
    options.initialDate = new Date(2023, 11, 25);

    const { getByTestId, getByText } = render(<Datepicker {...options} />);

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const cell = getByText('25');
    fireEvent.doubleClick(cell);

    const todoList = getByTestId('todoList');

    expect(todoList).toBeInTheDocument();
  });
});
