import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (blog) =>
  (await axios.post(baseUrl, blog, { headers: { Authorization: token } })).data

export default { getAll, createNew, setToken }
