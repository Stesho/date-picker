import React, { ChangeEvent, useState } from 'react';

import {
  AddTodoButton,
  CloseButton,
  Date,
  DeleteButton,
  Head,
  Input,
  InputWrapper,
  List,
  ListItem,
  TodoListModal,
  TodoListOverlay,
} from '@/components/TodoList/TodoList.styled';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Todo } from '@/types/Todos';
import { dateToString } from '@/utils/dateToString';
import { getTodosByDate } from '@/utils/getTodosByDate';
import { setTodosByDate } from '@/utils/setTodosByDate';

interface TodoListProps {
  onClose: () => void;
  date: Date;
}
export const TodoList = ({ onClose, date }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => getTodosByDate(date));
  const [todoText, setTodoText] = useState<string>('');
  const todoListModalRef = useOutsideClick(onClose);

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
    <TodoListOverlay data-testid='todoList'>
      <TodoListModal ref={todoListModalRef}>
        <Head>
          <Date>{dateToString(date)}</Date>
          <CloseButton onClick={onCloseClick} type='button'>
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
      </TodoListModal>
    </TodoListOverlay>
  );
};
