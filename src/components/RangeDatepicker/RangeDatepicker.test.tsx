import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';

import { WEEK_DAYS_NAMES } from '@/constants/calendar/weekDaysNames';
import { errorMessages } from '@/constants/errorMessages/errorMessages';
import { CalendarTypes } from '@/types/CalendarTypes';
import { shiftArrayToLeft } from '@/utils/helpers/shiftArrayToLeft';

import 'jest-styled-components';
import '@testing-library/jest-dom';

import { RangeDatepicker, RangeDatepickerProps } from './RangeDatepicker';

type RangeDatepickerWrapperProps = Omit<
  RangeDatepickerProps,
  'setStartDate' | 'setFinishDate'
>;

const RangeDatepickerWrapper = (props: RangeDatepickerWrapperProps) => {
  const [startDate, setStartDate] = useState<Date | null>(
    props.startDate || null,
  );
  const [finishDate, setFinishDate] = useState<Date | null>(
    props.finishDate || null,
  );

  return (
    <RangeDatepicker
      {...props}
      startDate={startDate}
      setStartDate={setStartDate}
      finishDate={finishDate}
      setFinishDate={setFinishDate}
    />
  );
};

describe('Datepicker', () => {
  let options: RangeDatepickerWrapperProps;

  beforeEach(() => {
    options = {
      type: CalendarTypes.Month,
      startDate: null,
      finishDate: null,
      minDate: undefined,
      maxDate: undefined,
      isStartWithMonday: false,
      areWeekendsHidden: false,
      isHolidays: false,
    };
  });

  it('should correctly render default range picker', () => {
    const { container } = render(<RangeDatepickerWrapper {...options} />);
    expect(container).toBeInTheDocument();
  });

  it('should open calendar by clicking calendar icon', () => {
    const { getByTestId } = render(<RangeDatepickerWrapper {...options} />);
    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const calendar = getByTestId('calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('should select initial date', () => {
    const startDayNumber = 5;
    const startCellIndex = 9;
    const finishDayNumber = 10;
    const finishCellIndex = 14;

    options.startDate = new Date(2023, 11, startDayNumber);
    options.finishDate = new Date(2023, 11, finishDayNumber);

    const { getByTestId } = render(<RangeDatepickerWrapper {...options} />);
    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const selectedStartDate = getByTestId(`${startCellIndex}${startDayNumber}`);
    const selectedFinishDate = getByTestId(
      `${finishCellIndex}${finishDayNumber}`,
    );

    expect(selectedStartDate).toBeChecked();
    expect(selectedFinishDate).toBeChecked();
  });

  it('should change selected date when input value', () => {
    const startCellId = '1410';
    const finishCellId = '1915';
    const newDate = '10/12/2023 - 15/12/2023';

    const { getByTestId } = render(<RangeDatepickerWrapper {...options} />);

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const input = getByTestId('dateInput') as HTMLInputElement;
    fireEvent.change(input, { target: { value: newDate } });

    const selectedStartDate = getByTestId(startCellId);
    const selectedFinishDate = getByTestId(finishCellId);

    expect(input.value).toBe('10/12/2023 - 15/12/2023');
    expect(selectedStartDate).toBeChecked();
    expect(selectedFinishDate).toBeChecked();
  });

  it('should change input value when new date selected', () => {
    const startCellId = '95';
    const finishCellId = '1410';
    const newDate = '05/12/2023 - 10/12/2023';

    const { getByTestId } = render(<RangeDatepickerWrapper {...options} />);

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const selectedStartDate = getByTestId(startCellId);
    fireEvent.click(selectedStartDate);

    const selectedFinishDate = getByTestId(finishCellId);
    fireEvent.click(selectedFinishDate);

    const input = getByTestId('dateInput') as HTMLInputElement;

    expect(input.value).toBe(newDate);
    expect(selectedStartDate).toBeChecked();
    expect(selectedFinishDate).toBeChecked();
  });

  it('should change month by previous month controller clicking', () => {
    options.startDate = new Date(2023, 11, 12);
    options.finishDate = new Date(2023, 11, 15);

    const { getByTestId, getByText } = render(
      <RangeDatepickerWrapper {...options} />,
    );

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const prevCaption = getByText('December 2023');

    expect(prevCaption).toBeInTheDocument();

    const prevMonthController = getByTestId('prevController');
    fireEvent.click(prevMonthController);

    const currCaption = getByText('November 2023');

    expect(currCaption).toBeInTheDocument();
  });

  it('should change month by next month controller clicking', () => {
    options.startDate = new Date(2023, 11, 11);
    options.finishDate = new Date(2023, 11, 16);

    const { getByTestId, getByText } = render(
      <RangeDatepickerWrapper {...options} />,
    );

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const prevCaption = getByText('December 2023');

    expect(prevCaption).toBeInTheDocument();

    const nextMonthController = getByTestId('nextController');
    fireEvent.click(nextMonthController);

    const currCaption = getByText('January 2024');

    expect(currCaption).toBeInTheDocument();
  });

  it('should show error message if date format is invalid', () => {
    const invalidDateFormat = '05/12/2023-06/12/2023';
    const { getByTestId, getByText } = render(
      <RangeDatepickerWrapper {...options} />,
    );

    const input = getByTestId('dateInput') as HTMLInputElement;
    fireEvent.change(input, { target: { value: invalidDateFormat } });

    const errorMessage = getByText(errorMessages.rangepickerFormat);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should show error message if start date value is invalid', () => {
    const invalidDateValue = '05/13/2023 - 06/12/2023';
    const { getByTestId, getByText } = render(
      <RangeDatepickerWrapper {...options} />,
    );

    const input = getByTestId('dateInput') as HTMLInputElement;
    fireEvent.change(input, { target: { value: invalidDateValue } });

    const errorMessage = getByText(errorMessages.datesValidation('start'));

    expect(errorMessage).toBeInTheDocument();
  });

  it('should show error message if finish date value is invalid', () => {
    const invalidDateValue = '05/12/2023 - 32/12/2023';
    const { getByTestId, getByText } = render(
      <RangeDatepickerWrapper {...options} />,
    );

    const input = getByTestId('dateInput') as HTMLInputElement;
    fireEvent.change(input, { target: { value: invalidDateValue } });

    const errorMessage = getByText(errorMessages.datesValidation('finish'));

    expect(errorMessage).toBeInTheDocument();
  });

  it('should clear input value by cross button clicking', () => {
    options.startDate = new Date(2023, 5, 29);
    options.finishDate = new Date(2023, 6, 4);

    const { getByTestId, getByText } = render(
      <RangeDatepickerWrapper {...options} />,
    );

    const input = getByTestId('dateInput') as HTMLInputElement;
    const prevInputValue = input.value;

    const crossButton = getByText('✖');
    fireEvent.click(crossButton);

    const currentInputValue = input.value;

    expect(prevInputValue).toBe('29/06/2023 - 04/07/2023');
    expect(currentInputValue).toBe('');
  });

  it('should move cells to the left if isStartWithMonday props is true', () => {
    options.isStartWithMonday = true;
    const { getByTestId, getAllByTestId } = render(
      <RangeDatepickerWrapper {...options} />,
    );

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const weekCells = getAllByTestId('weekCell').map((el) => el.textContent);

    expect(weekCells).toEqual(shiftArrayToLeft(WEEK_DAYS_NAMES, 1));
  });

  it('should remove weekends cells if areWeekendsHidden props is true', () => {
    options.areWeekendsHidden = true;
    const { getByTestId, getAllByTestId } = render(
      <RangeDatepickerWrapper {...options} />,
    );

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const weekCells = getAllByTestId('weekCell').map((el) => el.textContent);
    const noWeekendsCells = shiftArrayToLeft(WEEK_DAYS_NAMES, 1).slice(0, 5);

    expect(weekCells).toEqual(noWeekendsCells);
  });

  it('should forbid to select date less than minimal date', () => {
    options.startDate = new Date(2023, 11, 15);
    options.finishDate = new Date(2023, 11, 16);
    options.minDate = new Date(2023, 11, 11);

    const { getByTestId, getByText } = render(
      <RangeDatepickerWrapper {...options} />,
    );

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
    options.startDate = new Date(2023, 11, 15);
    options.finishDate = new Date(2023, 11, 16);
    options.maxDate = new Date(2023, 11, 17);

    const { getByTestId, getByText } = render(
      <RangeDatepickerWrapper {...options} />,
    );

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
    options.startDate = new Date(2023, 11, 25);
    options.finishDate = new Date(2023, 11, 26);

    const { getByTestId, getByText } = render(
      <RangeDatepickerWrapper {...options} />,
    );

    const calendarIcon = getByTestId('calendarIcon');
    fireEvent.click(calendarIcon);

    const cell = getByText('25');
    fireEvent.doubleClick(cell);

    const todoList = getByTestId('todoList');

    expect(todoList).toBeInTheDocument();
  });
});
