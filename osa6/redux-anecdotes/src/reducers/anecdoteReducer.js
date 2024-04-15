import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, { payload }) => {
      return state.map(anecdote =>
        anecdote.id === payload
          ? {
            ...anecdote,
            votes: anecdote.votes + 1,
          }
          : anecdote
      )
    },
    createNew: (state, { payload }) => {
      if (Array.isArray(payload))
        return state.concat(...payload)

      return state.concat(payload)
    },
  }
})

export const { createNew, vote } = slice.actions
export default slice.reducer
