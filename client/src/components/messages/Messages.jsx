import React, { useState, useEffect } from 'react';
import { addDoc, collection, onSnapshot, query, where, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import moment from 'moment';

function Messages({ id, userId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesListRef = doc(db, 'users', id, 'MessagesList', userId);
    const messagesRef = collection(messagesListRef, 'Messages');
    const q = query(messagesRef);
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

  return (
    <div>
      <div>
        {messages.map((item) => (
          <div key={item.id}>
            {item.message}
            <div>{moment.unix(item.date.seconds).fromNow()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
