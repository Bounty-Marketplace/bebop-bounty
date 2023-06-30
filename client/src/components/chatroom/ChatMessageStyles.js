import styled from 'styled-components';

export const Host = styled.div``;

export const Chat = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 7px;
  > div > p {
    margin: 0;
  }
  > small {
    margin-top: 40px;
    color: #e6e6e6c9;
    font-size: 0.7em;
  }
`;

export const ChatRight = styled(Chat)`
  justify-content: flex-end;
  > div {
    margin-right: 13px;
    align-items: flex-end;
  }
`;

export const ChatLeft = styled(Chat)`
  justify-content: flex-start;
  > div {
    margin-left: 13px;
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
  border-radius: 15px;
  padding: 10px 15px;
  background-color: #cdeaffcf;
  color: rgb(12 48 120);
  width: max-content;
  min-width: 100px;
  max-width: calc(100% - 50px);
  margin-bottom: 10px;
`;
