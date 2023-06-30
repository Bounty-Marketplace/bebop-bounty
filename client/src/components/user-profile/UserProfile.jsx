/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { updateUserTransactions } from '../../slices/userSlice';
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
} from './ProfileStyles';

function UserProfile({ toggleTheme, theme }) {
  const dispatch = useDispatch();
  const { profile: userProfile, transactions: userTransactions } = useSelector(
    (state) => state.user
  );
  const userID = Number(useParams().buyer_id);

  useEffect(() => {
    axios
      .get('http://13.57.207.155:8080/api/transactions', {
        params: { userID },
      })
      .then((response) => {
        dispatch(updateUserTransactions(response.data));
      })
      .catch((err) => console.error('Error getting transactions', err));
  }, []);

  return (
    <Host>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <UserProfileContainer>
        <UserInfoContainer>
          <UserDetails>
            {userProfile && <h2>{userProfile.username}</h2>}
            {userProfile && <p>{userProfile.email}</p>}
          </UserDetails>
          {userProfile && <ProfileImage src={userProfile.profile_image} alt="profile-image" />}
          <Rating>Rating: {userProfile && <CoinRating size="30px" />}</Rating>
        </UserInfoContainer>

        <RightContainer>{userTransactions.length > 0 && <UserProfileDetails />}</RightContainer>
      </UserProfileContainer>
    </Host>
  );
}

export default UserProfile;
