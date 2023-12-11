import { useState } from 'react';

export const useTodos = () => {
  const [isOpenTodoList, setIsOpenTodoList] = useState<boolean>(false);

  const toggleTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  return {
    isOpenTodoList,
    toggleTodoList,
  };
};
