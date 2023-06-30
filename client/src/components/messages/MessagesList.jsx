/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, onSnapshot, query, doc } from 'firebase/firestore';
import NavBar from '../common/nav-bar/NavBar.jsx';
import Messages from './Messages.jsx';
import { updateUserID, updateUserProfile } from '../../slices/userSlice';
import {
  Host,
  MessagesListContainer,
  UsersContainer,
  MessagesContainer,
} from './MessagesListStyles';
import { auth, db } from '../../firebase';

function MessagesList({ toggleTheme, theme }) {
  const dispatch = useDispatch();
  const [authUser] = useAuthState(auth);
  const { profile: userProfile } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [curId, setCurId] = useState(userProfile.uid);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        axios
          .get(`http://13.57.207.155:8080/api/users/${user.uid}?auth=true`)
          .then((response) => {
            const { id, ...profile } = response.data[0];
            dispatch(updateUserID(id));
            dispatch(updateUserProfile(profile));
            setCurId(profile.uid);
            const userRef = doc(db, 'users', profile.uid);
            const q = query(collection(userRef, 'MessagesList'));
            const unsub = onSnapshot(q, (querySnapshot) => {
              const usersArr = [];
              querySnapshot.forEach((docs) => {
                usersArr.push({ ...docs.data(), id: docs.id });
              });
              console.log('usersArr', usersArr);
              setUsers(usersArr);
            });
            return () => unsub;
          })
          .catch((err) => console.log('Err in sendUserDataToServer: ', err));
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Host>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <MessagesListContainer>
        <UsersContainer>
          User:
          {users.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setUserId(item.uid);
              }}
            >
              {item.username}
            </div>
          ))}
        </UsersContainer>
        <MessagesContainer>
          {userId ? <Messages id={curId} userId={userId} /> : <div />}
        </MessagesContainer>
      </MessagesListContainer>
    </Host>
  );
}

export default MessagesList;
