import { Todo } from '@/types/Todos';
import { setTodosByDate } from '@/utils/todos/setTodosByDate';

export const onCloseClick =
  (date: Date, todos: Todo[], onClose: () => void) => () => {
    if (date) {
      setTodosByDate(date, todos);
    }
    onClose();
  };
