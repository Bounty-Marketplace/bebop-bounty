import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { Host, ChatLeft, ChatRight, Avatar, ChatBubble } from './MessageStyles';

function Message({ message }) {
  const [user] = useAuthState(auth);
  const isCurrentUser = message.uid === user.uid;

  return (
    <Host>
      {isCurrentUser ? (
        <ChatRight>
          <ChatBubble>
            <p className="user-name">{message.name}</p>
            <p className="user-message">{message.text}</p>
          </ChatBubble>
          <Avatar src={message.avatar} alt="user avatar" />
        </ChatRight>
      ) : (
        <ChatLeft>
          <Avatar src={message.avatar} alt="user avatar" />
          <ChatBubble>
            <p className="user-name">{message.name}</p>
            <p className="user-message">{message.text}</p>
          </ChatBubble>
        </ChatLeft>
      )}
    </Host>
  );
}
export default Message;
