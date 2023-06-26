import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function OfferHistoryEntry({ offer, getOffers }) {
  const handleBuyClick = () => {
    axios
      .post(`/api/transactions`, { offerID: offer.id })
      .then(getOffers())
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button onClick={handleBuyClick} variant="success" size="sm">
        Buy
      </Button>{' '}
      {'  '}{offer.condition} condition from {offer.seller_name} for ${offer.offer_amount}
    </div>
  );
}

export default OfferHistoryEntry;
