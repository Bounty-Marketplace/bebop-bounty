import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { GlobalContext } from '../../GlobalContext.jsx';
import TransactionHistoryEntry from './TransactionHistoryEntry.jsx';

function TransactionHistoryList() {
  const { userTransactions, setUserTransactions, userData } = useContext(GlobalContext);
  const [slice, setSlice] = useState(15);

  const getUserTransactions = () => {
    axios
      .get(`/api/transactions`, { params: { userID: userData.id } })
      .then((r) => setUserTransactions(r.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log('using user data:', userData.id)
    getUserTransactions();
  }, []);

  return (
    <div>
      <Stack gap={3}>
        {userTransactions.slice(0, slice).map((entry) => (
          <TransactionHistoryEntry key={entry.id} userID={userData.id} entry={entry} getUserTransactions={getUserTransactions} />
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
