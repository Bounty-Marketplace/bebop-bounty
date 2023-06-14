import React, { useContext, useState } from 'react';
import {
  StyledNavBar,
  StyledNavLogo,
  StyledListBountyBtn,
  StyledProfilePic,
} from './navbar.styled';
import SearchBar from '../../bounty-page/SearchBar.jsx';
import ProfileMenu from './ProfileMenu.jsx';
import ListBountyModal from './ListBountyModal.jsx';

export default function NavBar() {
  const [profileMenu, setProfileMenu] = useState(false);
  const [listBountyModal, setListBountyModal] = useState(false);
  const exampleImgURL = 'https://i.pinimg.com/736x/5b/91/44/5b914448091084b6aa3dc005fad52eba.jpg';

  const showProfileMenu = () => setProfileMenu(!profileMenu);
  const showListBountyModal = () => setListBountyModal(!listBountyModal);

  return (
    <StyledNavBar>
      <StyledNavLogo>Bebop Bounty</StyledNavLogo>
      <SearchBar />
      <StyledListBountyBtn onClick={() => showListBountyModal()}>List Bounty</StyledListBountyBtn>
      {listBountyModal && <ListBountyModal showListBountyModal={showListBountyModal} />}
      <StyledProfilePic onClick={() => showProfileMenu()}>
        <img src={exampleImgURL} alt="profile pic" />
      </StyledProfilePic>
      {profileMenu && <ProfileMenu />}
    </StyledNavBar>
  );
}
