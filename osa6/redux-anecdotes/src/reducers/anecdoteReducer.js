import { v4 as getId } from 'uuid'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = { anecdotes: anecdotesAtStart.map(asObject) }

const reducer = (state = initialState, { type, payload }) => {

  switch (type) {

    case 'VOTE':
      return {
        ...state,
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === payload.id
            ? {
              ...anecdote,
              votes: anecdote.votes + 1,
            }
            : anecdote
        )
      }

    case 'NEW':
      return {
        ...state,
        anecdotes: state.anecdotes.concat(payload)
      }

    default:
      return state
  }

}

export const vote = (id) => ({
  type: 'VOTE',
  payload: { id }
})

export const createA = (content) => ({
  type: 'NEW',
  payload: asObject(content)
})

export default reducer