import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () =>
  (await axios.get(BASE_URL)).data

export const createAnecdote = async (content) =>
  (await axios.post(BASE_URL, content)).data

export const updateAnecdote = async (content) =>
  (await axios.put(`${BASE_URL}/${content.id}`, content)).data
