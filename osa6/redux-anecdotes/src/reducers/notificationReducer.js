import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setFeedback(_state, { payload }) {
      return payload
    },
    nullFeedback() {
      return null
    }
  }
})

export const { setFeedback, nullFeedback } = slice.actions
export default slice.reducer
