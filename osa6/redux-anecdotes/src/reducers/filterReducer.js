import { createSlice } from '@reduxjs/toolkit'

const initialState = '.*'

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter(_state, { payload }) {
      return payload
    }
  }
})

export const { changeFilter } = slice.actions
export default slice.reducer
