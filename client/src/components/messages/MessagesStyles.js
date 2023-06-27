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
  overflow: scroll;
  padding: 30px 100px;
`;

export const MessagesForm = styled.form`
  display: flex;
  justify-content: flex-end;
`;
