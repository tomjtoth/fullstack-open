import { createSlice } from '@reduxjs/toolkit'
import svc from '../services/anecdotes'

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

export const initAnecdotes = () => {
  return async dispatch => {
    const notes = await svc.getAll()
    dispatch(createNew(notes))
  }
}

export default slice.reducer
