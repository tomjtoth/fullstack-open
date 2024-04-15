import { createSlice } from '@reduxjs/toolkit'
import svc from '../services/anecdotes'

const slice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    update: (state, { payload }) => {
      return state.map(anecdote =>
        anecdote.id === payload.id
          ? payload
          : anecdote
      )
    },
    add: (state, { payload }) => {
      if (Array.isArray(payload))
        return state.concat(...payload)

      return state.concat(payload)
    },
  }
})

export const { add, update } = slice.actions

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await svc.getAll()
    dispatch(add(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await svc.add(content)
    dispatch(add(anecdote))
  }
}

export const voteAnecdote = (content) => {
  return async dispatch => {
    const updated = await svc.vote(content)
    dispatch(update(updated))
  }
}

export default slice.reducer
