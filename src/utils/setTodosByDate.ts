import { TODOS_STORAGE_KEY } from '@/constants/todos/storage';
import { Todo, Todos } from '@/types/Todos';

export const setTodosByDate = (date: Date, todos: Todo[]): void => {
  const todosList = localStorage.getItem(TODOS_STORAGE_KEY);
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  if (todosList) {
    const list: Todos = JSON.parse(todosList);

    if (todos.length === 0) {
      delete list[dateString];
    } else {
      list[dateString] = todos;
    }

    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(list));
  } else {
    const list = {
      [dateString]: todos,
    };
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(list));
  }
};
