import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GlobalContext } from '../../GlobalContext.jsx';
import BountyCardFront from '../../bounty-page/BountyCard.jsx';
import OfferHistoryList from '../offer-history/OfferHistoryList.jsx';
import TransactionHistoryList from '../transaction-history/TransactionHistoryList.jsx';
import { StyledBountyBoardWrapper, StyledFlexContainer } from '../../bounty-page/StyledBountyBoard';
import { StyledBountyPageBorder } from '../../../theme';
import NavBar from '../../common/nav-bar/NavBar.jsx';

function BountyHistory({ toggleTheme, theme }) {
  const { userBounties, setUserBounties, userData } = useContext(GlobalContext);
  const [bountyID, setBountyID] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (ID) => {
    setBountyID(ID);
    setShow(true);
  };

  const getUserBounties = () => {
    axios
      .get(`/api/bounties`, { params: { userID: userData.id } })
      .then((r) => setUserBounties(r.data))
      .catch((e) => console.log(e));
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
                  {userBounties.map((entry) => (
                    <span key={entry.id} onClick={(e) => handleShow(entry.id)}>
                      <BountyCardFront Bounty={entry} />
                    </span>
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
              <OfferHistoryList bountyID={bountyID} />
            </Offcanvas.Body>
          </Offcanvas>
        </StyledBountyBoardWrapper>
      </StyledBountyPageBorder>
    </div>
  );
}

export default BountyHistory;
