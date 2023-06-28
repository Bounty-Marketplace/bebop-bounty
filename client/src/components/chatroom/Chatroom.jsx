import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { updateUserID, updateUserProfile } from '../../slices/userSlice';
import { auth, db } from '../../firebase';
import NavBar from '../common/nav-bar/NavBar.jsx';
import ChatMessage from './ChatMessage.jsx';
import { Host, MessagesContainer, MessagesWrapper, MessagesForm } from './ChatroomStyles';

function Chatroom({ toggleTheme, theme }) {
  const dispatch = useDispatch();
  const [authUser] = useAuthState(auth);
  const { profile: userProfile } = useSelector((state) => state.user);
  const scroll = useRef();
  const [message, setMessage] = useState(''); // send message (user input)
  const [messages, setMessages] = useState([]); // messages in db
  const exampleImgURL = 'https://i.pinimg.com/736x/5b/91/44/5b914448091084b6aa3dc005fad52eba.jpg';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        axios
          .get(`http://13.57.207.155:8080/api/users/${user.uid}?auth=true`)
          .then((response) => {
            const { id, ...profile } = response.data[0];
            dispatch(updateUserID(id));
            dispatch(updateUserProfile(profile));
          })
          .catch((err) => console.log('Err in sendUserDataToServer: ', err));
      }
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') {
      return;
    }
    const { uid } = auth.currentUser;
    console.log('userProfile in chatroom: ', userProfile);
    await addDoc(collection(db, 'chatroom'), {
      text: message,
      name: userProfile.username || '',
      avatar: userProfile.profile_image || exampleImgURL,
      createdAt: serverTimestamp(),
      uid,
    });
    scroll.current.scrollIntoView({ behavior: 'smooth' });
    setMessage('');
  };

  useEffect(() => {
    const q = query(collection(db, 'chatroom'), orderBy('createdAt'), limit(50));
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
          {messages &&
            authUser &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} user={authUser} />)}
          <span ref={scroll} />
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

export default Chatroom;
