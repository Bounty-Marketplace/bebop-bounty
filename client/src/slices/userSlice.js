import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {},
    bounties: [],
    offers: [],
    transactions: [],
  },
  reducers: {
    updateUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateUserBounties: (state, action) => {
      state.bounties = action.payload;
    },
    updateUserOffers: (state, action) => {
      state.offers = action.payload;
    },
    updateUserTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const { updateUserProfile, updateUserBounties, updateUserOffers, updateUserTransactions } =
  userSlice.actions;

export default userSlice.reducer;
