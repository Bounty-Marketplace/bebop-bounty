import React, { useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateBountyOffers } from '../../../slices/bountySlice';
import OfferHistoryEntry from './OfferHistoryEntry.jsx';

function OfferHistoryList() {
  const dispatch = useDispatch();
  const { id: bountyID, offers: bountyOffers } = useSelector((state) => state.bounty);

  const getOffers = () => {
    axios
      .get(`http://13.57.207.155:8080/api/offers`, { params: { bountyID } })
      .then((response) => {
        dispatch(updateBountyOffers(response.data));
      })
      .catch((e) => console.error(e));
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
