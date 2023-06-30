/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import {
  ReviewContainer,
  TransactionContainer,
  ReviewList,
  ReviewEntry,
  ReviewTop,
  ReviewBottom,
  TransactionList,
  TransactionEntry,
  TransactionTop,
  TransactionBottom,
} from './RightContainerStyles';

function UserProfileDetails({ userID }) {
  const { transactions: userTransactions } = useSelector((state) => state.user);
  return (
    <>
      <ReviewContainer>
        <h2>Reviews:</h2>
        <ReviewList>
          {userID &&
            userTransactions &&
            userTransactions.map((transaction) => (
              <ReviewEntry key={transaction.bounty_name + transaction.id}>
                <ReviewTop>
                  <div>
                    {userID === transaction.buyer_id ? ' Seller: ' : 'Buyer: '}
                    {userID === transaction.buyer_id
                      ? transaction.seller_name
                      : transaction.buyer_name}
                  </div>
                </ReviewTop>
                <ReviewBottom>
                  <div>
                    {userID === transaction.buyer_id
                      ? transaction.feedback_to_buyer || 'No review provided.'
                      : transaction.feedback_to_seller || 'No review provided.'}
                  </div>
                  <div>{moment(transaction.transaction_date).fromNow()}</div>
                </ReviewBottom>
              </ReviewEntry>
            ))}
        </ReviewList>
      </ReviewContainer>
      <TransactionContainer>
        <h2>Transaction History:</h2>
        <TransactionList>
          {userID &&
            userTransactions &&
            userTransactions.map((transaction) => (
              <TransactionEntry key={transaction.bounty_name + transaction.id}>
                <TransactionTop>
                  <div>Bounty: {transaction.bounty_name}</div>
                </TransactionTop>
                <TransactionBottom>
                  <div>
                    Completed with{' '}
                    {userID === transaction.buyer_id
                      ? transaction.seller_name
                      : transaction.buyer_name}
                    {' as '}
                    {userID === transaction.buyer_id ? ' buyer ' : 'seller'}
                  </div>
                  <div>{moment(transaction.transaction_date).format('YYYY-MM-DD')}</div>
                </TransactionBottom>
              </TransactionEntry>
            ))}
        </TransactionList>
      </TransactionContainer>
    </>
  );
}

export default UserProfileDetails;
