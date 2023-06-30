import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { updateUserID } from '../../../slices/userSlice';
import {
  StyledProfileMenuContainer,
  StyledProfileMenuHeader,
  StyledUpArrow,
  StyledProfileMenuProperties,
  StyledClearCurtain,
} from './navbar.styled';
import { auth } from '../../../firebase';

export default function ProfileMenu({ toggleTheme, showProfileMenu, theme }) {
  const exampleImgURL = 'https://i.pinimg.com/736x/5b/91/44/5b914448091084b6aa3dc005fad52eba.jpg';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: userID, profile: userProfile } = useSelector((state) => state.user);
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        alert('Sign out successful.');
        dispatch(updateUserID(null)); // clear current user data after sign out
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error occurrs during sign out:', error);
      });
  };

  const routeToMyBounties = (e) => {
    e.preventDefault();
    navigate('/profile/bounty-history');
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (userID) {
      navigate(`/user-profile/${userID}`);
    } else {
      alert("You haven't logged into your account yet.");
    }
  };

  const handleChatroomClick = (e) => {
    e.preventDefault();
    navigate('/chatroom');
  };

  const handleMessagesClick = (e) => {
    e.preventDefault();
    navigate('/messages');
  };

  return (
    <>
      <StyledClearCurtain onClick={showProfileMenu} />
      <StyledUpArrow />
      <StyledProfileMenuContainer>
        <StyledProfileMenuHeader>
          <img src={userProfile.profile_image || exampleImgURL} alt="profile pic" />
          <div>
            <p>{userProfile.username || 'Guest'}</p>
            <p>{userProfile.email || ''}</p>
          </div>
        </StyledProfileMenuHeader>
        <StyledProfileMenuProperties>
          <button type="button" onClick={handleProfileClick}>
            Profile
          </button>
          <button type="button" onClick={(e) => routeToMyBounties(e)}>
            Your Bounties
          </button>
          <button type="button" onClick={handleMessagesClick}>
            Messages
          </button>
          <button type="button" onClick={handleChatroomClick}>
            Chatroom
          </button>
          <button
            type="button"
            onClick={() => {
              toggleTheme();
            }}
          >
            {theme === 'dark' ? 'Light Mode 🌞' : 'Dark Mode 🌜'}
          </button>
          <button type="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </StyledProfileMenuProperties>
      </StyledProfileMenuContainer>
    </>
  );
}
