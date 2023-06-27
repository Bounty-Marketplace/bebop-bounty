import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import NavBar from '../common/nav-bar/NavBar.jsx';
import Message from './Message.jsx';
import { Host, MessagesContainer, MessagesWrapper, MessagesForm } from './MessagesStyles';
import { GlobalContext } from '../GlobalContext.jsx';

function Messages({ toggleTheme, theme }) {
  // const [user] = useAuthState(auth);
  const [message, setMessage] = useState(''); // send message (user input)
  const [messages, setMessages] = useState([]); // messages in db
  const { userData, setUserData } = useContext(GlobalContext);
  const exampleImgURL = 'https://i.pinimg.com/736x/5b/91/44/5b914448091084b6aa3dc005fad52eba.jpg';

  useEffect(() => {
    const keepLogin = onAuthStateChanged(auth, (user) => {
      if (user) {
        axios
          .get(`/api/users/${user.uid}?auth=true`)
          .then((response) => {
            setUserData(response.data[0]);
          })
          .catch((err) => console.log('Err in sendUserDataToServer: ', err));
      }
    });
    return keepLogin;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') {
      alert('Enter valid message');
      return;
    }
    const { uid } = auth.currentUser;
    console.log('userData in messages: ', userData);
    await addDoc(collection(db, 'messages'), {
      text: message,
      name: userData.username || '',
      avatar: userData.profile_image || exampleImgURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage('');
  };

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'), limit(50));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const messagesArr = [];
      QuerySnapshot.forEach((doc) => {
        messagesArr.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesArr);
    });
    return () => unsubscribe;
  }, []);

  return (
    <Host>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <MessagesContainer>
        <MessagesWrapper>
          {messages && messages.map((msg) => <Message key={msg.id} message={msg} />)}
        </MessagesWrapper>
        <MessagesForm onSubmit={(event) => sendMessage(event)}>
          <input
            id="messageInput"
            name="messageInput"
            type="text"
            className="form-input__input"
            placeholder="type message..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </MessagesForm>
      </MessagesContainer>
    </Host>
  );
}

export default Messages;
