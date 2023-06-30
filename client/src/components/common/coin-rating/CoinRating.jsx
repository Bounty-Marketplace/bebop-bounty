/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import FilledCoinIcon from '../../../assets/coin-gold.png';
import EmptyCoinIcon from '../../../assets/coin-grey.png';

const Host = styled.div`
  display: flex;
  width: fit-content;
  margin: 0;
  height: fit-content;
  position: relative;
  color: #ccc;
  width: 150px;
  height: 30px;
`;

const FilledCoinContainer = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  overflow: hidden;
  width: ${(props) => props.rating};
`;

const FilledCoin = styled.img`
  height: 30px;
  width: 30px;
`;

const EmptyCoinContainer = styled.div`
  position: absolute;
  z-index: 0;
  display: flex;
`;

const EmptyCoin = styled.img`
  height: 30px;
  width: 30px;
`;

// const user = {
//   rating_thumbs_up: 35,
//   rating_thumbs_down: 15,
// };
// const Host = styled.div`
//   display: flex;
//   width: fit-content;
//   margin: 0;
//   height: fit-content;
//   position: relative;
//   color: #ccc;
//   width: 150px;
//   height: 15px;
//   padding-bottom: 10%;
// `;

// const FilledCoinContainer = styled.div`
//   position: absolute;
//   z-index: 1;
//   display: flex;
//   overflow: hidden;
//   width: ${(props) => props.rating};
// `;

// const FilledCoin = styled.img`
//   height: ${(props) => props.size};
//   width: ${(props) => props.size};
// `;

// const EmptyCoinContainer = styled.div`
//   position: absolute;
//   z-index: 0;
//   display: flex;
// `;

// const EmptyCoin = styled.img`
//   height: ${(props) => props.size};
//   width: ${(props) => props.size};
// `;

function CoinRating({ user }) {
  const rating = `${Math.round(
    (user.rating_thumbs_up / (user.rating_thumbs_up + user.rating_thumbs_down)) * 100
  ).toFixed(2)}%`;

  return (
    <Host>
      <FilledCoinContainer rating={rating}>
        {[...Array(5)].map((e, i) => (
          <FilledCoin src={FilledCoinIcon} key={`filled-${i}`} />
        ))}
      </FilledCoinContainer>
      <EmptyCoinContainer>
        {[...Array(5)].map((e, i) => (
          <EmptyCoin src={EmptyCoinIcon} key={`empty-${i}`} />
        ))}
      </EmptyCoinContainer>
    </Host>
  );
}

export default CoinRating;
