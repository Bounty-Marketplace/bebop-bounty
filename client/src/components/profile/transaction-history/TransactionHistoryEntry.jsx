import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { TransEntry } from '../BountyHistoryStyles';

function TransactionHistoryEntry({ userID, entry: transaction, getUserTransactions }) {
  const [role, setRole] = useState('');

  const date = new Date(transaction.transaction_date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleGoodFeedbackClick = () => {
    const feedBack = {};
    if (role === 'seller') {
      feedBack.ratingToBuyer = 'good';
    } else {
      feedBack.ratingToSeller = 'good';
    }
    console.log('button Clicked:', feedBack);
    axios
      .patch(`http://13.57.207.155:8080/api/transactions/${transaction.id}`, feedBack)
      .then(() => getUserTransactions())
      .catch((err) => console.log(err));
  };

  const handleBadFeedbackClick = () => {
    const feedBack = {};
    if (role === 'seller') {
      feedBack.ratingToBuyer = 'bad';
    } else {
      feedBack.ratingToSeller = 'bad';
    }
    console.log('button Clicked:', feedBack);
    axios
      .patch(`http://13.57.207.155:8080/api/transactions/${transaction.id}`, feedBack)
      .then(() => getUserTransactions())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (userID === transaction.seller_id) {
      setRole('seller');
    } else {
      setRole('buyer');
    }
  }, []);

  return (
    <TransEntry>
      {transaction.seller_id === userID ? 'Earned' : 'Paid'} {transaction.sale_amount} for{' '}
      {transaction.bounty_name || 'a bounty'} on {date}{' '}
      {transaction.rating_to_buyer === null && role === 'seller' ? (
        <div>
          <Button
            onClick={() => {
              handleGoodFeedbackClick();
            }}
            variant="outline-success"
            size="sm"
          >
            Good
          </Button>{' '}
          <Button
            onClick={() => {
              handleBadFeedbackClick();
            }}
            variant="outline-danger"
            size="sm"
          >
            Bad
          </Button>
        </div>
      ) : null}
      {transaction.rating_to_seller === null && role === 'buyer' ? (
        <div>
          <Button
            onClick={() => {
              handleGoodFeedbackClick();
            }}
            variant="outline-success"
            size="sm"
          >
            Good
          </Button>{' '}
          <Button
            onClick={() => {
              handleBadFeedbackClick();
            }}
            variant="outline-danger"
            size="sm"
          >
            Bad
          </Button>
        </div>
      ) : null}
      {transaction.rating_to_seller !== null && role === 'buyer' ? <div>Feedback Given</div> : null}
      {transaction.rating_to_buyer !== null && role === 'seller' ? <div>Feedback Given</div> : null}
    </TransEntry>
  );
}

export default TransactionHistoryEntry;
