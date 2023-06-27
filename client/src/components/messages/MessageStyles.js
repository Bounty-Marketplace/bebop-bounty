import styled from 'styled-components';

export const Host = styled.div``;

export const Chat = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 20px;
  > div > p {
    margin: 0;
  }
`;

export const ChatRight = styled(Chat)`
  justify-content: flex-end;
  > div {
    align-items: flex-end;
  }
`;

export const ChatLeft = styled(Chat)`
  justify-content: flex-start;
  > div {
    align-items: flex-start;
  }
`;

export const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  object-fit: cover;
  grid-column-start: 2;
`;

export const ChatBubble = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 10px;
  background-color: #94b2ffc7;
  color: #1c2c4c;
  width: max-content;
  min-width: 100px;
  max-width: calc(100% - 50px);
  box-shadow: -2px 2px 1px 1px #4c768d;
  margin-bottom: 10px;
`;
