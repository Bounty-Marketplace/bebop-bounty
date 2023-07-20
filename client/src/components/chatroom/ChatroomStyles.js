import styled from 'styled-components';

export const Host = styled.div`
  margin-top: 50px;
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border: 2px solid white;
  padding: 20px;
  box-sizing: border-box;
  width: 93%;
  height: 80vh;
  margin: 10px auto;
  min-height: 500px;
  min-width: 900px;
`;

export const MessagesWrapper = styled.div`
  overflow: auto;
  padding: 30px 50px;
`;

export const MessagesForm = styled.form`
  width: 100%;
  margin-top: 20px;
`;

export const MessagesInput = styled.input`
  width: 90%;
  margin-right: 20px;
`;

export const MessagesButton = styled.button`
  font-size: 1.2em;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #ffffff12;
  border: 1px solid;
  width: 7%;
`;
