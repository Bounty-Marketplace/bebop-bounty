/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  UserInfoBottom,
  Rating,
  MessageButton,
  RightContainer,
} from './ProfileStyles';

function UserProfile({ toggleTheme, theme }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleChatClick = (e) => {
    e.preventDefault();
    navigate(`/messages`);
  };

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
          <UserInfoBottom>
            <Rating>Rating: {userProfile && <CoinRating size="30px" />}</Rating>
            <MessageButton onClick={handleChatClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 30 30"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Chat
            </MessageButton>
          </UserInfoBottom>
        </UserInfoContainer>
        <RightContainer>{userTransactions.length > 0 && <UserProfileDetails />}</RightContainer>
      </UserProfileContainer>
    </Host>
  );
}

export default UserProfile;
