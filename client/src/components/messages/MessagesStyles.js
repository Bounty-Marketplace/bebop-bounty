import styled from 'styled-components';

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-height: 300px;
  overflow: scroll;
  min-width: 700px;
  gap: 10px;
`;

export const MessagesView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  background-color: rgb(255 255 255 / 10%);
  padding: 10px;
  height: 80vh;
  overflow: scroll;
`;

export const MessagesForm = styled.form`
  width: 100%;
`;

export const MessagesInput = styled.input`
  width: 90%;
`;

export const MessagesButton = styled.button`
  color: #111222;
  width: 10%;
`;
