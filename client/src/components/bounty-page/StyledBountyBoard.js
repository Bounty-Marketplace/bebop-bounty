import styled from 'styled-components';
import BountyCardFront from './BountyCard.jsx';
import CardFlip from './CardFlip.jsx';

export const StyledBountyBoardWrapper = styled.div`
  border: solid;
  /* background-color: lightgray; */
`;

export const StyledDropdown = styled.select`
  border: solid;
`;

export const StyledCardFlip = styled(CardFlip)`
  border: solid;
  background-color: yellow;
  z-index: 2;
`;

export const StyledBountyCard = styled.div`
  /* border: solid; */
  /* display: flex; */
  /* background-color: white; */
  box-shadow: 0 0 3px black;
  width: 225px;
  height: 275px;
  padding: 10px;
  margin: 10px;
`;

export const StyledBountyCardBack = styled(StyledBountyCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FlipToFront = styled.div``;

export const OfferLayout = styled.div`
  /* border: solid; */
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const StyledImageContainer = styled.div`
  position: relative;
  height: 50%;
  width: 100%;
  /* margin-bottom: 20px; */
  /* border: solid; */
`;

export const StyledImage = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: blue;
`;

export const StyledPrice = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  /* border: solid; */
`;

export const StyledWanted = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  /* border: solid; */
`;

export const StyledMidcardContainer = styled.div`
  /* border: solid; */
  padding-top: 2%;
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* height: fit-content; */
`;
export const StyledBottomCardContainer = styled.div`
  /* border: solid; */
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  /* height: fit-content; */
`;

export const StyledTitle = styled.div`
  font-size: large;
  font-weight: bold;
  /* border: solid; */
`;

export const StyledBuyerName = styled.div`
  font-size: small;
  /* border: solid; */
`;

export const StyledDeadline = styled.div`
  font-size: small;
  /* border: solid; */
`;

export const StyledCategory = styled.div`
  /* border: solid; */
`;

export const StyledDescription = styled.div`
  /* border: solid; */
`;

export const StyledPreferredPayment = styled.div`
  /* border: solid; */
`;

export const StyledRatingBox = styled.div`
  /* border: solid; */
`;

export const StyledMakeOfferButton = styled.button`
  justify-self: baseline;
  align-self: center;
  /* border: solid; */
`;

export const StyledCurrentOffers = styled.div`
  font-size: small;
  /* border: solid;s */
`;

export const ModalWrapper = styled.div`
  border: solid;
`;