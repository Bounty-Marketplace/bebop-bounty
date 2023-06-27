import { configureStore } from '@reduxjs/toolkit';
import bountyBoardReducer from '../slices/bountyBoardSlice';
import bountyReducer from '../slices/bountySlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    allBounties: bountyBoardReducer,
    bounty: bountyReducer,
    user: userReducer,
  },
});

export default store;
