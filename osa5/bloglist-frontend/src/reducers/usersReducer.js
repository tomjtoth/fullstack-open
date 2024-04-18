import { createSlice } from '@reduxjs/toolkit';
import service from '../services/users';

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    populate: (state, { payload }) => state.concat(...payload),
  },
});

const { populate } = slice.actions;

export const initUsers = () => {
  return async (dispatch) => {
    const allUsers = await service.getAll();
    dispatch(populate(allUsers));
  };
};

export default slice.reducer;
