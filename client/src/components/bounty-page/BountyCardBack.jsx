import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CoinRating from '../common/coin-rating/CoinRating.jsx';
import { StyledBountyCardBack } from '../../theme';

import {
  StyledTitle,
  StyledRatingBox,
  StyledMakeOfferButton,
  StyledCurrentOffers,
  FlipToFront,
  StyledCardBackText,
  StyledPreferredPayment,
  StyledCategory,
  StyledDescription,
  OfferLayoutCenter,
  OfferLayout,
  StyledCardBackBottom,
  StyledBuyerName,
} from './StyledBountyBoard';

export default function BountyCardBack({ Bounty, flipCard, showOfferModal }) {
  const { name, category, description, preferred_payment, offerCount, buyer_id, buyer_name } =
    Bounty;
  const [user, setUser] = useState(null);

  let { deadline } = Bounty;
  [deadline] = deadline.split(' ');
  deadline = deadline.substring(5, 10);
  deadline = deadline.replaceAll('-', '/');
  if (deadline.charAt(0) === '0') {
    deadline = deadline.slice(1);
  }

  useEffect(() => {
    axios
      .get(`http://13.57.207.155:8080/api/users/${buyer_id}?auth=false`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((err) => console.log('Err in sendUserDataToServer: ', err));
  }, []);

  const navigate = useNavigate();
  const handleBuyerNameClick = (e) => {
    e.preventDefault();
    navigate(`/user-profile`);
  };

  return (
    <StyledBountyCardBack onClick={flipCard}>
      <StyledTitle>{name}</StyledTitle>

      <StyledCategory>
        <b>Category:</b> {category}
      </StyledCategory>
      <StyledDescription>
        <b>Description: </b>
        {description}
      </StyledDescription>
      {preferred_payment && (
        <StyledPreferredPayment>Preferred Payment: {preferred_payment}</StyledPreferredPayment>
      )}

      <OfferLayoutCenter>
        <Button onClick={showOfferModal} variant="success" size="sm">
          Make An Offer!
        </Button>
      </OfferLayoutCenter>

      <OfferLayout>
        <StyledRatingBox>Rating: {user && <CoinRating size="20px" />}</StyledRatingBox>
        <StyledBuyerName onClick={handleBuyerNameClick}>{buyer_name}</StyledBuyerName>
      </OfferLayout>
    </StyledBountyCardBack>
  );
}
