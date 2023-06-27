import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserTransactions } from '../../../slices/userSlice';
import TransactionHistoryEntry from './TransactionHistoryEntry.jsx';

function TransactionHistoryList() {
  const { transactions: userTransactions, id: userID } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [slice, setSlice] = useState(15);

  const getUserTransactions = () => {
    axios
      .get(`http://13.57.207.155:8080/api/transactions`, { params: { userID } })
      .then((response) => {
        dispatch(updateUserTransactions(response.data));
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    console.log('using user data:', userID);
    getUserTransactions();
  }, []);

  return (
    <div>
      <Stack gap={3}>
        {userTransactions.slice(0, slice).map((transaction) => (
          <TransactionHistoryEntry
            key={transaction.id}
            userID={userID}
            transaction={transaction}
            getUserTransactions={getUserTransactions}
          />
        ))}
      </Stack>
      {slice < userTransactions.length ? (
        <Button variant="link" size="sm" onClick={() => setSlice(slice + 10)}>
          Show More
        </Button>
      ) : null}
    </div>
  );
}

export default TransactionHistoryList;
