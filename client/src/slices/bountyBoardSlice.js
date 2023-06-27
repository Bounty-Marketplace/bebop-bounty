import { createSlice } from '@reduxjs/toolkit';

export const bountyBoardSlice = createSlice({
  name: 'bountyBoard',
  initialState: {
    allBounties: [],
  },
  reducers: {
    updateAllBounties: (state, action) => {
      state.allBounties = action.payload;
    },
  },
});

export const { updateAllBounties } = bountyBoardSlice.actions;

export default bountyBoardSlice.reducer;
