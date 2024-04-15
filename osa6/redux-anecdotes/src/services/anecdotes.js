import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const add = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async ({ content, id, votes }) => {
  const response = await axios.put(`${baseUrl}/${id}`, {
    id, content, votes: votes + 1
  })
  return response.data
}

export default {
  getAll,
  add,
  vote
}