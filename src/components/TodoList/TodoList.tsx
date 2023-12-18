import React, { ChangeEvent, useState } from 'react';

import {
  AddTodoButton,
  CloseButton,
  DeleteButton,
  InputWrapper,
  List,
  ListItem,
  TodoListWrapper,
} from '@/components/TodoList/TodoList.styled';
import { Todo } from '@/types/Todos';
import { getTodosByDate } from '@/utils/getTodosByDate';
import { setTodosByDate } from '@/utils/setTodosByDate';

interface TodoListProps {
  onClose: () => void;
  date: Date;
}
export const TodoList = ({ onClose, date }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => getTodosByDate(date));
  const [todoText, setTodoText] = useState<string>('');

  const onInputNewTodo = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const addTodo = () => {
    if (todoText.trim().length !== 0) {
      setTodoText('');
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todoText,
        },
      ]);
    }
  };

  const deleteTodo = (todoId: number) => () => {
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(filteredTodos);
  };

  const onCloseClick = () => {
    if (date) {
      setTodosByDate(date, todos);
    }
    onClose();
  };

  return (
    <TodoListWrapper data-testid='todoList'>
      <CloseButton onClick={onCloseClick} type='button'>
        ✖
      </CloseButton>
      <InputWrapper>
        <input type='text' value={todoText} onChange={onInputNewTodo} />
        <AddTodoButton type='button' onClick={addTodo}>
          add todo
        </AddTodoButton>
      </InputWrapper>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <span>{todo.text}</span>
            <DeleteButton type='button' onClick={deleteTodo(todo.id)}>
              ✖
            </DeleteButton>
          </ListItem>
        ))}
      </List>
    </TodoListWrapper>
  );
};
