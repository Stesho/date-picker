import { TODOS_STORAGE_KEY } from '@/constants/todos';
import { Todos } from '@/types/Todos';

export const getTodosByDate = (date: Date) => {
  const todosList = localStorage.getItem(TODOS_STORAGE_KEY);
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  if (todosList) {
    const list: Todos = JSON.parse(todosList);
    return list[dateString] || [];
  }

  return [];
};
