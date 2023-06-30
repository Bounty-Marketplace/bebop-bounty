import React from 'react';
import moment from 'moment';
import { Host, ChatLeft, ChatRight, Avatar, ChatBubble } from './ChatMessageStyles';

function ChatMessage({ user, message }) {
  const isCurrentUser = message.uid === user.uid;

  return (
    <Host>
      {isCurrentUser ? (
        <ChatRight>
          {message.createdAt && <small>{moment.unix(message.createdAt.seconds).fromNow()}</small>}
          <ChatBubble>
            <b>{message.name}</b>
            <p>{message.text}</p>
          </ChatBubble>
          <Avatar src={message.avatar} alt="user avatar" />
        </ChatRight>
      ) : (
        <ChatLeft>
          <Avatar src={message.avatar} alt="user avatar" />
          <ChatBubble>
            <b>{message.name}</b>
            <p>{message.text}</p>
          </ChatBubble>
          {message.createdAt && <small>{moment.unix(message.createdAt.seconds).fromNow()}</small>}
        </ChatLeft>
      )}
    </Host>
  );
}
export default ChatMessage;
