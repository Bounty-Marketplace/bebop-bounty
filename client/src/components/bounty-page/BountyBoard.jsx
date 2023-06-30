import React from 'react';
import { useSelector } from 'react-redux';

import {
  StyledBountyBoardWrapper,
  StyledCardFlip,
  StyledBountyCollection,
} from './StyledBountyBoard';

export default function BountyBoard() {
  const { allBounties } = useSelector((state) => state.bountyBoard);
  const Cards = allBounties.map((bounty) => <StyledCardFlip key={bounty.id} bounty={bounty} />);

  return (
    <StyledBountyBoardWrapper>
      <StyledBountyCollection>{Cards}</StyledBountyCollection>
    </StyledBountyBoardWrapper>
  );
}
