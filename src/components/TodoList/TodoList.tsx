import React, { ChangeEvent, useState } from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Todo } from '@/types/Todos';
import { dateToString } from '@/utils/dates/dateToString';
import { addTodo } from '@/utils/todos/addTodo';
import { deleteTodo } from '@/utils/todos/deleteTodo';
import { getTodosByDate } from '@/utils/todos/getTodosByDate';
import { onCloseClick } from '@/utils/todos/onCloseClick';

import {
  AddTodoButton,
  CloseButton,
  DeleteButton,
  Head,
  Input,
  InputWrapper,
  List,
  ListItem,
  TodoDate,
  TodoListModal,
  TodoListOverlay,
} from './TodoList.styled';

interface TodoListProps {
  onClose: () => void;
  date: Date;
}

export const TodoList = ({ onClose, date }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => getTodosByDate(date));
  const [todoText, setTodoText] = useState<string>('');
  const todoListModalRef = useOutsideClick(onCloseClick(date, todos, onClose));

  const onInputNewTodo = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  return (
    <TodoListOverlay data-testid='todoList'>
      <TodoListModal ref={todoListModalRef}>
        <Head>
          <TodoDate>{dateToString(date)}</TodoDate>
          <CloseButton
            onClick={onCloseClick(date, todos, onClose)}
            type='button'
          >
            ✖
          </CloseButton>
        </Head>
        <InputWrapper>
          <Input
            type='text'
            placeholder='Enter a task...'
            value={todoText}
            onChange={onInputNewTodo}
          />
          <AddTodoButton
            type='button'
            onClick={addTodo(todoText, setTodoText, setTodos)}
          >
            add todo
          </AddTodoButton>
        </InputWrapper>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <span>{todo.text}</span>
              <DeleteButton
                type='button'
                onClick={deleteTodo(todos, todo.id, setTodos)}
              >
                ✖
              </DeleteButton>
            </ListItem>
          ))}
        </List>
      </TodoListModal>
    </TodoListOverlay>
  );
};
