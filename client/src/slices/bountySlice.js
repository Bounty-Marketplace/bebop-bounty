import { createSlice } from '@reduxjs/toolkit';

export const bountySlice = createSlice({
  name: 'bounty',
  initialState: {
    id: null,
    info: null,
    offers: [],
  },
  reducers: {
    updateBountyID: (state, action) => {
      state.id = action.payload;
    },
    updateBountyInfo: (state, action) => {
      state.info = action.payload;
    },
    updateBountyOffers: (state, action) => {
      state.offers = action.payload;
    },
  },
});

export const { updateBountyID, updateBountyInfo, updateBountyOffers } = bountySlice.actions;

export default bountySlice.reducer;
