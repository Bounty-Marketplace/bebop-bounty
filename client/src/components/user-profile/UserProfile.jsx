/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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
  const [user, setUser] = useState(null);
  const { transactions: userTransactions } = useSelector((state) => state.user);
  const userID = Number(useParams().buyerID);

  useEffect(() => {
    axios
      .get('http://13.57.207.155:8080/api/transactions', {
        params: { userID },
      })
      .then((response) => {
        console.log('transation data: ', response.data)
        dispatch(updateUserTransactions(response.data));
      })
      .catch((err) => console.error('Error getting transactions', err));
    axios
      .get(`http://13.57.207.155:8080/api/users/${userID}?auth=false`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((err) => console.log('Err in getuserdata: ', err));
  }, []);

  const handleChatClick = (e) => {
    e.preventDefault();
    navigate(`/messages/${user.uid}`);
  };

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
          <UserInfoBottom>
            <Rating>Rating: {user && <CoinRating user={user} />}</Rating>
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
        <RightContainer>
          {userTransactions.length > 0 && <UserProfileDetails userID={userID} />}
        </RightContainer>
      </UserProfileContainer>
    </Host>
  );
}

export default UserProfile;
