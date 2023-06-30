import styled from 'styled-components';

export const Host = styled.div`
  margin-top: 50px;
  min-width: 1000px;
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
`;

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid;
  width: 30%;
  padding: 20px;
  overflow: scroll;
  > div {
    display: flex;
    align-items: center;
    border-radius: 10px;
    gap: 10px;
    background-color: rgb(255 255 255 / 10%);
    padding: 10px;
    height: 70px;
    cursor: pointer;
  }
`;

export const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  object-fit: cover;
  grid-column-start: 2;
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  width: 70%;
  padding: 20px;
  gap: 10px;
`;
