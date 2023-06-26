import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import BountyCardFront from './BountyCard.jsx';
import BountyCardBack from './BountyCardBack.jsx';
import OfferModal from './OfferModal.jsx';

export default function CardFlip({ Bounty }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = (e) => {
    e.preventDefault();
    isFlipped ? setIsFlipped(false) : setIsFlipped(true);
  };

  const [offerModal, setOfferModal] = useState(false);

  const showOfferModal = () => {
    setOfferModal(!offerModal);
  };

  return (
    <>
      {offerModal && (
        <OfferModal offerModal={offerModal} showOfferModal={showOfferModal} Bounty={Bounty} />
      )}
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <BountyCardFront Bounty={Bounty} flipCard={flipCard} showOfferModal={showOfferModal}>
          FRONT of card
        </BountyCardFront>

        <BountyCardBack Bounty={Bounty} flipCard={flipCard} showOfferModal={showOfferModal}>
          BACK of card
        </BountyCardBack>
      </ReactCardFlip>
    </>
  );
}
