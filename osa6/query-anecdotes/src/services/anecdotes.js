import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(BASE_URL).then(res => res.data)
