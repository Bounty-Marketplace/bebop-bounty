/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setDoc, collection, onSnapshot, query, doc } from 'firebase/firestore';
import NavBar from '../common/nav-bar/NavBar.jsx';
import Messages from './Messages.jsx';
import { updateUserID, updateUserProfile } from '../../slices/userSlice';
import {
  Host,
  MessagesListContainer,
  UsersContainer,
  Avatar,
  MessagesContainer,
} from './MessagesListStyles';
import { auth, db } from '../../firebase';

function MessagesList({ toggleTheme, theme }) {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const { profile: userProfile } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [curId, setCurId] = useState(userProfile.uid);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getMessagesList = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const response = await axios.get(
              `http://13.57.207.155:8080/api/users/${user.uid}?auth=true`
            );
            const { id, ...profile } = response.data[0];
            dispatch(updateUserID(id));
            dispatch(updateUserProfile(profile));
            setCurId(profile.uid);

            if (userID) {
              try {
                const response1 = await axios.get(
                  `http://13.57.207.155:8080/api/users/${userID}?auth=true`
                );
                const messagesListRef = doc(db, 'users', profile.uid, 'MessagesList', userID);
                await setDoc(messagesListRef, {
                  uid: userID,
                  username: response1.data[0].username || '',
                  avatar: response1.data[0].profile_image,
                });
              } catch (error) {
                console.error('Error fetching user data:', error);
              }
            }

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
            return unsub;
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      });
      return unsubscribe;
    };

    getMessagesList();
  }, []);

  return (
    <Host>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <MessagesListContainer>
        <UsersContainer>
          Users:
          {users.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedUser(item.uid);
              }}
            >
              <Avatar src={item.avatar} alt="user avatar" />
              {item.username}
            </div>
          ))}
        </UsersContainer>
        <MessagesContainer>
          {selectedUser ? <Messages id={curId} userId={selectedUser} /> : <div />}
        </MessagesContainer>
      </MessagesListContainer>
    </Host>
  );
}

export default MessagesList;
