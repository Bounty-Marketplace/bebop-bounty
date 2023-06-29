import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledBountyCard } from '../../theme';

import {
  StyledImageContainer,
  StyledImage,
  StyledPrice,
  StyledMidcardContainer,
  StyledTitle,
  StyledWanted,
  StyledBuyerName,
  StyledMakeOfferButton,
  StyledCurrentOffers,
  StyledDeadline,
  StyledBottomCardContainer,
  StyledTitleAndName,
} from './StyledBountyBoard';

export default function BountyCardFront({ Bounty, flipCard, isFlipped }) {
  const { id, buyer_name, buyer_id, offer_count, name, price, image } = Bounty;

  const navigate = useNavigate();
  const handleBuyerNameClick = (e) => {
    e.preventDefault();
    navigate(`/user-profile`);
  };

  let { deadline } = Bounty;
  deadline = deadline.substring(5, 10);
  deadline = deadline.replaceAll('-', '/');
  if (deadline.charAt(0) === '0') {
    deadline = deadline.slice(1);
  }

  return (
    <StyledBountyCard onClick={flipCard} isFlipped={isFlipped}>
      <StyledImageContainer>
        <StyledWanted>WANTED</StyledWanted>
        <StyledImage src={image} />
        <StyledPrice>${price}</StyledPrice>
      </StyledImageContainer>
      <StyledMidcardContainer>
        <StyledTitleAndName>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StyledTitle>{name}</StyledTitle>
            <StyledBuyerName onClick={handleBuyerNameClick}>{buyer_name}</StyledBuyerName>
          </div>
        </StyledTitleAndName>
      </StyledMidcardContainer>
      <StyledBottomCardContainer>
        <StyledCurrentOffers>Current Offers: {offer_count}</StyledCurrentOffers>
        <StyledDeadline>Deadline: {deadline}</StyledDeadline>
      </StyledBottomCardContainer>
    </StyledBountyCard>
  );
}
