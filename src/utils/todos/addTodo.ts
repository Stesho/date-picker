import { Dispatch, SetStateAction } from 'react';

import { Todo } from '@/types/Todos';

export const addTodo =
  (
    todoText: string,
    setTodoText: Dispatch<SetStateAction<string>>,
    setTodos: Dispatch<SetStateAction<Todo[]>>,
  ) =>
  () => {
    if (todoText.trim().length !== 0) {
      setTodoText('');
      setTodos((todos) => [
        ...todos,
        {
          id: todos.length + 1,
          text: todoText,
        },
      ]);
    }
  };
