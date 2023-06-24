/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserProfileDetails from './UserProfileDetails.jsx';
import CoinRating from '../common/coin-rating/CoinRating.jsx';
import NavBar from '../common/nav-bar/NavBar.jsx';
import {
  Host,
  UserProfileContainer,
  UserInfoContainer,
  ProfileImage,
  UserDetails,
  Rating,
  RightContainer,
  StyledRatingWrapper,
} from './ProfileStyles';

function UserProfile({ toggleTheme, theme }) {
  const [transactions, setTransactions] = useState(null);
  const [user, setUser] = useState(null);
  const userId = Number(useParams().buyer_id);

  useEffect(() => {
    axios
      .get('/api/transactions', {
        params: {
          userID: userId,
        },
      })
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((err) => console.error('Error getting transactions', err));
    axios
      .get(`/api/users/${userId}?auth=false`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((err) => console.log('Err in sendUserDataToServer: ', err));
  }, []);

  return (
    <Host>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <UserProfileContainer>
        <UserInfoContainer>
          <UserDetails>
            {user && <h2>{user.username}</h2>}
            {user && <p>{user.email}</p>}
          </UserDetails>
          {user && <ProfileImage src={user.profile_image} alt="profile-image" />}
          <Rating>Rating: {user && <CoinRating user={user} size="30px" />}</Rating>
        </UserInfoContainer>

        <RightContainer>
          {transactions && user && (
            <UserProfileDetails userId={userId} transactions={transactions} />
          )}
        </RightContainer>
      </UserProfileContainer>
    </Host>
  );
}

export default UserProfile;
