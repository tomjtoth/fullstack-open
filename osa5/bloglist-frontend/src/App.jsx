import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Feedback from './components/Feedback'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const json = localStorage.getItem('user')
    if (json) {
      const user = JSON.parse(json)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  return (<>
    <Feedback x={{ feedback, setFeedback }} />

    {!user &&
      <LoginForm x={{
        username, setUsername,
        password, setPassword,
        setUser, setFeedback
      }} />
    }
    <BlogForm x={{
      blogs, setBlogs,
      user, setUser,
      setFeedback
    }} />
  </>
  )
}

export default App
