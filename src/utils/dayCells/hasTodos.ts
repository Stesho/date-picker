import { getTodosByDate } from '@/utils/getTodosByDate';

export const hasTodos = (year: number, month: number, selectedDay: number) => {
  const todosList = getTodosByDate(new Date(year, month, selectedDay));
  return todosList.length !== 0;
};
