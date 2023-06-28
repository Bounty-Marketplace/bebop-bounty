import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { updateAllBounties } from '../../slices/bountyBoardSlice';
import { updateUserID, updateUserProfile } from '../../slices/userSlice';
import {
  StyledFilterBar,
  StyledSelect,
  StyledLocation,
  StyledLocationInputs,
  StyledSeeMore,
} from './styled-components/bountypage.styled';
import { StyledBountyPageBorder } from '../../theme';
import NavBar from '../common/nav-bar/NavBar.jsx';
import BountyBoard from './BountyBoard.jsx';
import { auth } from '../../firebase';

export default function BountyPage({ toggleTheme, theme }) {
  const { allBounties } = useSelector((state) => state.bountyBoard);
  const [sortBy, setSortBy] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const dispatch = useDispatch();

  const searchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="13px" width="13px" viewBox="0 0 512 512">
      <path
        fill="white"
        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
      />
    </svg>
  );

  useEffect(() => {
    const keepLogin = onAuthStateChanged(auth, (user) => {
      if (user) {
        axios
          .get(`http://13.57.207.155:8080/api/users/${user.uid}?auth=true`)
          .then((response) => {
            const { id, ...profile } = response.data[0];
            dispatch(updateUserID(id));
            dispatch(updateUserProfile(profile));
          })
          .catch((err) => console.log('Err in sendUserDataToServer: ', err));
      }
    });
    return keepLogin;
  }, []);

  const getAllBounties = () => {
    axios
      .get('http://13.57.207.155:8080/api/bounties', { params: { count: 10 } })
      .then(({ data }) => {
        dispatch(updateAllBounties(data));
      })
      .catch((err) => console.error('There was a problem GETTING all bounties: ', err));
  };

  const submitCity = () => {
    if (city.length >= 2) {
      axios
        .get('http://13.57.207.155:8080/api/bounties', { params: { city } })
        .then(({ data }) => {
          dispatch(updateAllBounties(data));
          setCity('');
        })
        .catch((err) => console.error('There was a probelm retreiving city data', err));
    }
  };
  const submitState = () => {
    if (state.length >= 2) {
      axios
        .get('http://13.57.207.155:8080/api/bounties', { params: { state } })
        .then(({ data }) => {
          dispatch(updateAllBounties(data));
          setState('');
        })
        .catch((err) => console.error('There was a probelm retreiving state data', err));
    }
  };

  useEffect(() => {
    getAllBounties();
  }, []);

  useEffect(() => {
    if (category || sortBy) {
      axios
        .get('http://13.57.207.155:8080/api/bounties', {
          params: {
            category,
            sortBy,
          },
        })
        .then(({ data }) => {
          console.log('category data', data);
          dispatch(updateAllBounties(data));
        })
        .catch((err) => console.error('There was a problem retreiving category data', err));
    }
  }, [category, sortBy]);

  const seeMore = (length) => {
    axios
      .get('http://13.57.207.155:8080/api/bounties', {
        params: {
          count: length + 5,
        },
      })
      .then(({ data }) => {
        dispatch(updateAllBounties(data));
      })
      .catch((err) => console.error('There was a probelm retreiving city data', err));
  };

  return (
    <StyledBountyPageBorder>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <StyledFilterBar>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 50 }}>
            Sort By:{' '}
            <StyledSelect defaultValue="Newest" onChange={(e) => setSortBy(e.target.value)}>
              <option>newest</option>
              <option>price-low-to-high</option>
              <option>price-high-to-low</option>
            </StyledSelect>
          </div>
          <div>
            Category:{' '}
            <StyledSelect defaultValue="" onChange={(e) => setCategory(e.target.value)}>
              <option>All</option>
              <option>clothing</option>
              <option>decor</option>
              <option>gadgets</option>
              <option>furniture</option>
            </StyledSelect>
          </div>
        </div>
        <StyledLocation>
          <StyledLocationInputs style={{ marginRight: 50 }}>
            City: <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <button type="button" onClick={() => submitCity()}>
              {searchIcon}
            </button>
          </StyledLocationInputs>
          <StyledLocationInputs>
            State: <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
            <button type="button" onClick={() => submitState()}>
              {searchIcon}
            </button>
          </StyledLocationInputs>
        </StyledLocation>
      </StyledFilterBar>
      <BountyBoard />
      <StyledSeeMore onClick={() => seeMore(allBounties.length)}>See More</StyledSeeMore>
    </StyledBountyPageBorder>
  );
}
