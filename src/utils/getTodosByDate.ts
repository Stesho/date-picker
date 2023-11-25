import { TODOS_STORAGE_KEY } from '@/constants/todos';
import { Todo, Todos } from '@/types/Todos';

export const getTodosByDate = (date: Date): Todo[] => {
  const todosList = localStorage.getItem(TODOS_STORAGE_KEY);
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  if (todosList) {
    const list: Todos = JSON.parse(todosList);
    return list[dateString] || [];
  }

  return [];
};
