import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import BountyCardFront from './BountyCard.jsx';
import BountyCardBack from './BountyCardBack.jsx';
import OfferModal from './OfferModal.jsx';

export default function CardFlip({ bounty }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const [offerModal, setOfferModal] = useState(false);

  const showOfferModal = () => {
    setOfferModal(!offerModal);
  };

  return (
    <>
      {offerModal && (
        <OfferModal offerModal={offerModal} showOfferModal={showOfferModal} bounty={bounty} />
      )}
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <BountyCardFront bounty={bounty} flipCard={flipCard} showOfferModal={showOfferModal}>
          FRONT of card
        </BountyCardFront>
        <BountyCardBack bounty={bounty} flipCard={flipCard} showOfferModal={showOfferModal}>
          BACK of card
        </BountyCardBack>
      </ReactCardFlip>
    </>
  );
}
