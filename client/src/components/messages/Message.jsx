import React from 'react';
import moment from 'moment';
import { Host, ChatLeft, ChatRight, Avatar, ChatBubble } from './MessageStyles';

function Message({ userMessage, id }) {
  const isCurrentUser = userMessage.uid === id;

  return (
    <Host>
      {isCurrentUser ? (
        <ChatRight>
          {userMessage.date && <small>{moment.unix(userMessage.date.seconds).fromNow()}</small>}
          <ChatBubble>
            <b>{userMessage.username}</b>
            <p>{userMessage.message}</p>
          </ChatBubble>
          <Avatar src={userMessage.avatar} alt="user avatar" />
        </ChatRight>
      ) : (
        <ChatLeft>
          <Avatar src={userMessage.avatar} alt="user avatar" />
          <ChatBubble>
            <b>{userMessage.username}</b>
            <p>{userMessage.message}</p>
          </ChatBubble>
          {userMessage.date && <small>{moment.unix(userMessage.date.seconds).fromNow()}</small>}
        </ChatLeft>
      )}
    </Host>
  );
}
export default Message;
