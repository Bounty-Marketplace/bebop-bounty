import React, { useState, useEffect } from 'react';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import Message from './Message.jsx';
import { auth, db } from '../../firebase';
import {
  MessagesContainer,
  MessagesView,
  MessagesForm,
  MessagesInput,
  MessagesButton,
} from './MessagesStyles';

function Messages({ id, userId }) {
  const { profile: userProfile } = useSelector((state) => state.user);
  const [message, setMessage] = useState(''); // send message (user input)
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const messagesListRef = doc(db, 'users', id, 'MessagesList', userId);
    const messagesRef = collection(messagesListRef, 'Messages');
    const q = query(messagesRef, orderBy('date', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArr = [];
      querySnapshot.forEach((docs) => {
        messagesArr.push({ ...docs.data(), id: docs.id });
      });
      console.log('messagesArr', messagesArr);
      setMessages(messagesArr);
    });

    return () => unsubscribe;
  }, [userId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') {
      return;
    }
    try {
      let messagesListRef = doc(db, 'users', id, 'MessagesList', userId);
      let messagesRef = collection(messagesListRef, 'Messages');
      await addDoc(messagesRef, {
        uid: id,
        username: userProfile.username || '',
        message,
        date: serverTimestamp(),
        avatar: userProfile.profile_image,
      });

      messagesListRef = doc(db, 'users', userId, 'MessagesList', id);
      messagesRef = collection(messagesListRef, 'Messages');
      await addDoc(messagesRef, {
        uid: id,
        username: userProfile.username || '',
        message,
        date: serverTimestamp(),
        avatar: userProfile.profile_image,
      });
    } catch (error) {
      console.error('Error adding message:', error);
    }
    setMessage('');
  };

  return (
    <MessagesContainer>
      <MessagesView>
        {messages && messages.map((item) => <Message key={item.id} id={id} userMessage={item} />)}
      </MessagesView>
      <MessagesForm onSubmit={sendMessage}>
        <MessagesInput
          name="messageInput"
          type="text"
          placeholder="type message..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <MessagesButton type="submit">Send</MessagesButton>
      </MessagesForm>
    </MessagesContainer>
  );
}

export default Messages;
