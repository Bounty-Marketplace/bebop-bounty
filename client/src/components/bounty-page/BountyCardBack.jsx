import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CoinRating from '../common/coin-rating/CoinRating.jsx';
import { StyledBountyCardBack } from '../../theme';
import {
  StyledTitle,
  StyledRatingBox,
  StyledPreferredPayment,
  StyledCategory,
  StyledDescription,
  OfferLayoutCenter,
  OfferLayout,
  StyledBuyerName,
} from './StyledBountyBoard';

export default function BountyCardBack({ bounty, flipCard, showOfferModal }) {
  const {
    name,
    category,
    description,
    preferred_payment: preferredPayment,
    buyer_id: buyerID,
    buyer_name: buyerName,
  } = bounty;
  const [user, setUser] = useState(null);

  let { deadline } = bounty;
  [deadline] = deadline.split(' ');
  deadline = deadline.substring(5, 10);
  deadline = deadline.replaceAll('-', '/');
  if (deadline.charAt(0) === '0') {
    deadline = deadline.slice(1);
  }

  useEffect(() => {
    axios
      .get(`http://13.57.207.155:8080/api/users/${buyerID}?auth=false`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((err) => console.log('Err in get userdata: ', err));
  }, []);

  const navigate = useNavigate();
  const handleBuyerNameClick = (e) => {
    e.preventDefault();
    navigate(`/user-profile/${buyerID}`);
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
      {preferredPayment && (
        <StyledPreferredPayment>Preferred Payment: {preferredPayment}</StyledPreferredPayment>
      )}

      <OfferLayoutCenter>
        <Button onClick={showOfferModal} variant="success" size="sm">
          Make An Offer!
        </Button>
      </OfferLayoutCenter>

      <OfferLayout>
        <StyledRatingBox>Rating: {user && <CoinRating user={user} />}</StyledRatingBox>
        <StyledBuyerName onClick={handleBuyerNameClick}>{buyerName}</StyledBuyerName>
      </OfferLayout>
    </StyledBountyCardBack>
  );
}
