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

/**
 * works without auth, nobodies can also like blogs
 * 
 * @param {Blog} param0 
 * @returns Blog
 */
const incrLike = async ({ id, likes }) =>
  (await axios.put(`${baseUrl}/${id}`, { likes: ++likes })).status


export default { getAll, createNew, setToken, incrLike }
