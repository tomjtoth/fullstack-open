import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setFeedback(_state, { payload }) {
      return payload
    }
  }
})

export const { setFeedback } = slice.actions
export default slice.reducer
