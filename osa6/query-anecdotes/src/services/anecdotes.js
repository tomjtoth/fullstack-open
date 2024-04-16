import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () =>
  (await axios.get(BASE_URL)).data

export const createAnecdote = async (content) =>
  (await axios.post(BASE_URL, content)).data
