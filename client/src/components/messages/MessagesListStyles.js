import styled from 'styled-components';

export const Host = styled.div`
  margin-top: 50px;
`;

export const MessagesListContainer = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  border: 2px solid white;
  padding: 20px;
  box-sizing: border-box;
  width: 93%;
  height: 80vh;
  margin: 10px auto;
  min-height: 500px;
  min-width: 900px;
`;

export const UsersContainer = styled.div`
  border: 1px solid;
  width: 30%;
  padding: 20px;
  overflow: scroll;
  > div {
    display: flex;
    align-items: center;
    height: 50px;
    cursor: pointer;
  }
`;

export const MessagesContainer = styled.div`
  border: 1px solid;
  width: 70%;
  padding: 20px;
`;
