import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    profile: {},
    bounties: [],
    offers: [],
    transactions: [],
  },
  reducers: {
    updateUserID: (state, action) => {
      state.id = action.payload;
    },
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

export const {
  updateUserID,
  updateUserProfile,
  updateUserBounties,
  updateUserOffers,
  updateUserTransactions,
} = userSlice.actions;

export default userSlice.reducer;
