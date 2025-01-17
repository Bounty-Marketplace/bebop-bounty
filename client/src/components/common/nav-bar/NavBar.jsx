import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StyledNavBar, StyledListBountyBtn, StyledProfilePic } from './navbar.styled';
import { StyledNavLogo } from '../../../theme';
import SearchBar from './SearchBar.jsx';
import ProfileMenu from './ProfileMenu.jsx';
import ListBountyModal from './ListBountyModal.jsx';

export default function NavBar({ toggleTheme, theme }) {
  const [profileMenu, setProfileMenu] = useState(false);
  const [listBountyModal, setListBountyModal] = useState(false);
  const exampleImgURL = 'https://i.pinimg.com/736x/5b/91/44/5b914448091084b6aa3dc005fad52eba.jpg';
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.user);
  const showProfileMenu = () => setProfileMenu(!profileMenu);
  const showListBountyModal = () => setListBountyModal(!listBountyModal);

  const handleLogoOnClick = (e) => {
    e.preventDefault();
    navigate('/bounty-page');
  };

  return (
    <StyledNavBar>
      <StyledNavLogo onClick={handleLogoOnClick}>Bebop Bounty</StyledNavLogo>
      <SearchBar />
      <StyledListBountyBtn onClick={() => showListBountyModal()}>List Bounty</StyledListBountyBtn>
      {listBountyModal && <ListBountyModal showListBountyModal={showListBountyModal} />}
      <StyledProfilePic onClick={() => showProfileMenu()}>
        <img src={profile.profile_image || exampleImgURL} alt="profile pic" />
      </StyledProfilePic>
      {profileMenu && (
        <ProfileMenu showProfileMenu={showProfileMenu} theme={theme} toggleTheme={toggleTheme} />
      )}
    </StyledNavBar>
  );
}
