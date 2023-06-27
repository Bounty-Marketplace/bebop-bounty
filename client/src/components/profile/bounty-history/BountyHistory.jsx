import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { updateUserBounties } from '../../../slices/userSlice';
import { updateBountyID } from '../../../slices/bountySlice';
import BountyCardFront from '../../bounty-page/BountyCard.jsx';
import OfferHistoryList from '../offer-history/OfferHistoryList.jsx';
import TransactionHistoryList from '../transaction-history/TransactionHistoryList.jsx';
import { StyledBountyBoardWrapper, StyledFlexContainer } from '../../bounty-page/StyledBountyBoard';
import { StyledBountyPageBorder } from '../../../theme';
import NavBar from '../../common/nav-bar/NavBar.jsx';

function BountyHistory({ toggleTheme, theme }) {
  const { id: userID, bounties: userBounties } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (ID) => {
    dispatch(updateBountyID(ID));
    setShow(true);
  };

  const getUserBounties = () => {
    axios
      .get(`http://13.57.207.155:8080/api/bounties`, { params: { userID } })
      .then((response) => {
        dispatch(updateUserBounties(response.data));
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getUserBounties();
  }, []);

  return (
    <div>
      <style type="text/css">
        {`
          .offcanvas {
            background-color: rgba(0, 0, 0, .25);
            backdrop-filter: blur(10px);
            color: white;
          }
        `}
      </style>
      <StyledBountyPageBorder>
        <NavBar theme={theme} toggleTheme={toggleTheme} />
        <StyledBountyBoardWrapper>
          <Container fluid>
            <Row>
              <Col lg="9">
                <h2>Your Open Bounties</h2>
                <StyledFlexContainer>
                  {userBounties.map((bounty) => (
                    <BountyCardFront
                      Bounty={bounty}
                      key={bounty.id}
                      onClick={() => handleShow(bounty.id)}
                    />
                  ))}
                </StyledFlexContainer>
              </Col>
              <Col lg="3">
                <h2>Transaction History</h2>
                <TransactionHistoryList />
              </Col>
            </Row>
          </Container>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header>
              <Offcanvas.Title>Bounty Offers</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <OfferHistoryList />
            </Offcanvas.Body>
          </Offcanvas>
        </StyledBountyBoardWrapper>
      </StyledBountyPageBorder>
    </div>
  );
}

export default BountyHistory;
