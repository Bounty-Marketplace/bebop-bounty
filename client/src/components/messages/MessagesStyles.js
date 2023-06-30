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
  padding: 20px;
  height: 80vh;
  overflow: scroll;
`;

export const MessagesForm = styled.form`
  width: 100%;
  margin-top: 20px;
`;

export const MessagesInput = styled.input`
  width: 87%;
  margin-right: 20px;
`;

export const MessagesButton = styled.button`
  font-size: 1.2em;
  color: white;
  padding: 5px 12px;
  border-radius: 5px;
  background-color: #ffffff12;
  border: 1px solid;
  width: 10%;
`;
