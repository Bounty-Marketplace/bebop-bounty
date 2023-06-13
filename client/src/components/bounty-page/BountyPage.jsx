import React, { useContext, useState } from 'react';
import { BountyPageBorder, FilterBar, FilterSelector } from './styled-components/bountypage.styled';
import NavBar from '../common/nav-bar/NavBar.jsx';

export default function BountyPage() {
  const [filter, setFilter] = useState('Recently Added');

  return (
    <BountyPageBorder>
      <NavBar />
      <FilterBar>
        <FilterSelector value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>Recently Added</option>
          <option>Price</option>
          <option>Category</option>
          <option>Location</option>
        </FilterSelector>
      </FilterBar>
      <div
        id="placeholder div container"
        style={{ border: 'solid 1px', height: 650, width: '93%', margin: 'auto', marginTop: 30 }}
      />
    </BountyPageBorder>
  );
}
