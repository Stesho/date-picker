import { Dispatch, SetStateAction } from 'react';

import { Todo } from '@/types/Todos';

export const deleteTodo =
  (todos: Todo[], todoId: number, setTodos: Dispatch<SetStateAction<Todo[]>>) =>
  () => {
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(filteredTodos);
  };
