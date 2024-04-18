import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setFeedback(_state, { payload }) {
      return payload;
    },
    nullFeedback() {
      return null;
    },
  },
});

const { setFeedback, nullFeedback } = slice.actions;

let counter = 0;

export const showNotification = (content, timeout = 10) => {
  return async (dispatch) => {
    ++counter;

    dispatch(setFeedback(content));

    setTimeout(() => {
      if (--counter === 0) dispatch(nullFeedback());
    }, timeout * 1000);
  };
};
export default slice.reducer;
