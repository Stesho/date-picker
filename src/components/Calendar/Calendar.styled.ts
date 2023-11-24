import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 250px;
  padding: 10px;
  border: 1px solid #ddd;
  background: #fff;
`;

export const Controller = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Cells = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Cell = styled.div`
  width: 32px;

  & input {
    display: none;
  }

  & input:disabled + label {
    color: grey;
  }

  & input:checked + label {
    background-color: red;
  }
`;
