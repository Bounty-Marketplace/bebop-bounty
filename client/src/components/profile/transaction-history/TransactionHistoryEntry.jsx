import React, { useState, useEffect } from 'react';
import { TransEntry } from '../BountyHistoryStyles';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function TransactionHistoryEntry({ userID, entry, getUserTransactions }) {
  const [role, setRole] = useState('');


  const date = new Date(entry.transaction_date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleGoodFeedbackClick = () => {
    let feedBack = {}
    if (role === 'seller') { feedBack.ratingToBuyer = 'good' }
    else { feedBack.ratingToSeller = 'good' }
    console.log('button Clicked:', feedBack )
    axios.patch(`/api/transactions/${entry.id}`, feedBack)
      .then((r) => getUserTransactions())
      .catch((err) => console.log(err))
  };

  const handleBadFeedbackClick = () => {
    let feedBack = {}
    if (role === 'seller') { feedBack.ratingToBuyer = 'bad' }
    else { feedBack.ratingToSeller = 'bad' }
    console.log('button Clicked:', feedBack )
    axios.patch(`/api/transactions/${entry.id}`, feedBack)
      .then((r) => getUserTransactions())
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    if (userID === entry.seller_id) { setRole('seller') }
    else { setRole('buyer') }
  }, []);

  return (
    <TransEntry>
      {entry.seller_id === userID ? 'Earned' : 'Paid'} {entry.sale_amount} for {' '}
      {entry.bounty_name || 'a bounty'} on {date} {' '}
      {entry.rating_to_buyer === null && role === 'seller' ? <div><Button onClick={() => { handleGoodFeedbackClick() }} variant="outline-success" size="sm">Good</Button> <Button onClick={() => { handleBadFeedbackClick() }} variant="outline-danger" size="sm">Bad</Button></div> : null}
      {entry.rating_to_seller === null && role === 'buyer' ? <div><Button onClick={() => { handleGoodFeedbackClick() }} variant="outline-success" size="sm">Good</Button> <Button onClick={() => { handleBadFeedbackClick() }} variant="outline-danger" size="sm">Bad</Button></div> : null}
      {entry.rating_to_seller !== null && role === 'buyer' ? <div>Feedback Given</div> : null}
      {entry.rating_to_buyer !== null && role === 'seller' ? <div>Feedback Given</div> : null}
    </TransEntry>
  );
}

export default TransactionHistoryEntry;
