import React from 'react';
import { useSelector } from 'react-redux';

import { StyledBountyBoardWrapper, StyledBountyCollection } from './StyledBountyBoard';
import CardFlip from './CardFlip.jsx';

export default function BountyBoard() {
  const { allBounties } = useSelector((state) => state.bountyBoard);
  const Cards = allBounties.map((bounty) => <CardFlip key={bounty.id} bounty={bounty} />);

  return (
    <StyledBountyBoardWrapper>
      <StyledBountyCollection>{Cards}</StyledBountyCollection>
    </StyledBountyBoardWrapper>
  );
}
