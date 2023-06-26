import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from 'react-bootstrap/Stack';
import OfferHistoryEntry from './OfferHistoryEntry.jsx';

function OfferHistoryList({ bountyID }) {
  const [bountyOffers, setBountyOffers] = useState([]);

  const getOffers = () => {
    axios
      .get(`/api/offers`, { params: { bountyID: bountyID } })
      .then((r) => setBountyOffers(r.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div>
      <h2>Total Offers: {bountyOffers.length}</h2>
      <Stack gap={3}>
        {bountyOffers.map((offer) => (
          <OfferHistoryEntry key={offer.id} offer={offer} getOffers={getOffers} />
        ))}
      </Stack>
    </div>
  );
}

export default OfferHistoryList;
