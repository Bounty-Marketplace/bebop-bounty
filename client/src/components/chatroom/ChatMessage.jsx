import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';
import { auth } from '../../firebase';
import { Host, ChatLeft, ChatRight, Avatar, ChatBubble } from './ChatMessageStyles';

function ChatMessage({ message }) {
  const [user] = useAuthState(auth);
  const isCurrentUser = message.uid === user.uid;

  return (
    <Host>
      {isCurrentUser ? (
        <ChatRight>
          <small>{moment.unix(message.createdAt.seconds).fromNow()}</small>
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
          <small>{moment.unix(message.createdAt.seconds).fromNow()}</small>
        </ChatLeft>
      )}
    </Host>
  );
}
export default ChatMessage;
