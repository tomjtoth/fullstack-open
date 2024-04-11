import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const json = window.localStorage.getItem('user')
    if (json) {
      const user = JSON.parse(json)
      setUser(user)
    }
  }, [])


  return (<>
    {user
      ? <BlogForm x={{ blogs, user, setUser }} />
      : <LoginForm x={{
        username, setUsername,
        password, setPassword,
        setUser, setErrorMessage
      }} />
    }
  </>
  )
}

export default App