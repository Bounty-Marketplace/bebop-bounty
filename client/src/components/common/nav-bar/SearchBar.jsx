import React, { useContext, useState } from 'react';
import axios from 'axios';
import { withTheme } from 'styled-components';
import { StyledSearchBar, StyledSearchInput, StyledSearchButton } from './navbar.styled';

function SearchBar({ setAllBounties }) {
  const [searchEntry, setSearchEntry] = useState('');

  const handleSearch = (entry) => {
    axios
      .get('/api/bounties', { params: { searchQuery: entry } })
      .then(({ data }) => setAllBounties(data))
      .catch((err) => console.error('There was an error retreiving search data', err));
  };

  return (
    <StyledSearchBar>
      <StyledSearchInput
        type="text"
        value={searchEntry}
        placeholder="Search"
        onChange={(e) => setSearchEntry(e.target.value)}
      />
      <StyledSearchButton type="submit" onClick={() => handleSearch(searchEntry)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="13px" width="13px" viewBox="0 0 512 512">
          <path
            fill="white"
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
          />
        </svg>
      </StyledSearchButton>
    </StyledSearchBar>
  );
}
export default withTheme(SearchBar);
