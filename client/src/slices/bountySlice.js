import { createSlice } from '@reduxjs/toolkit';

export const bountySlice = createSlice({
  name: 'bounty',
  initialState: {
    info: {},
    offers: [],
  },
  reducers: {
    updateBountyInfo: (state, action) => {
      state.info = action.payload;
    },
    updateBountyOffers: (state, action) => {
      state.offers = action.payload;
    },
  },
});

export const { updateBountyInfo, updateBountyOffers } = bountySlice.actions;

export default bountySlice.reducer;
