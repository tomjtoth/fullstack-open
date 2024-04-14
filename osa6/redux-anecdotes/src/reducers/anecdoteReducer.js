import { v4 as getId } from 'uuid'
import { createSlice } from '@reduxjs/toolkit'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
].map(asObject)

const slice = createSlice({
  name: 'anecdotes',
  initialState,
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
      return state.concat(asObject(payload))
    }
  }
})

export const { createNew, vote } = slice.actions
export default slice.reducer
