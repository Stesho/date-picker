import styled from 'styled-components';

export const TodoListWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 30px 10px 10px 10px;
  top: 0;
  left: 0;
  background-color: #00000090;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  left: calc(100% - 30px);
  font-size: 25px;
  color: #fff;

  cursor: pointer;
`;

export const InputWrapper = styled.div`
  display: flex;
  & input {
    width: 70%;
  }
`;

export const AddTodoButton = styled.button`
  width: 30%;
  background-color: #aaa;
  cursor: pointer;
`;

export const List = styled.ul`
  width: 100%;
  height: 200px;
  overflow: auto;
  padding: 0;
  margin: 10px 0 0 0;
  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: #fff;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
`;
