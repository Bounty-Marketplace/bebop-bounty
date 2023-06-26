import React, { useContext, useState } from 'react';

import {
  StyledBountyBoardWrapper,
  StyledDropdown,
  StyledCardFlip,
  StyledBountyCollection,
  StyledSeeMore,
} from './StyledBountyBoard';

export default function BountyBoard({ Context, allBounties }) {
  const Cards = allBounties.map((bounty) => <StyledCardFlip key={bounty.id} Bounty={bounty} />);

  return (
    <StyledBountyBoardWrapper>
      <StyledBountyCollection>{Cards}</StyledBountyCollection>
    </StyledBountyBoardWrapper>
  );
}
