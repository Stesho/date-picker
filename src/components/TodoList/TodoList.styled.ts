import styled from 'styled-components';

export const TodoListOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #00000090;
`;

export const TodoListModal = styled.div`
  position: relative;
  padding: 0 20px 20px 20px;
  color: #000;
  background-color: #fff;
  border-radius: 10px;
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 5px 0 15px 0;
`;

export const TodoDate = styled.span`
  font-weight: 600;
  font-size: 18px;
`;

export const CloseButton = styled.button`
  font-size: 25px;
  color: #000;

  cursor: pointer;
`;

export const InputWrapper = styled.div`
  display: flex;
  & input {
    width: 70%;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 11px;
  margin: 0 15px 0 0;
  color: #333;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  outline: none;

  &::placeholder {
    color: #bbb;
  }
`;

export const AddTodoButton = styled.button`
  padding: 0 10px;
  white-space: nowrap;
  border-radius: 8px;
  background-color: #2f80ed;
  text-transform: capitalize;
  color: white;
  cursor: pointer;
`;

export const List = styled.ul`
  width: 100%;
  overflow: auto;
  padding: 0;
  margin: 10px 0 0 0;
  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  border-radius: 5px;
  background-color: #fff;

  &:hover {
    color: #fff;
    background-color: rgba(47, 128, 237, 0.6);
  }
`;

export const DeleteButton = styled.button`
  cursor: pointer;
`;
