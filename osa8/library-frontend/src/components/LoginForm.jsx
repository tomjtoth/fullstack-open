import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const f = (func) => ({ target }) => func(target.value)

const LoginForm = ({ setError, setToken, page }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors
        .map(({ message }) => message).join('\n'))
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    const data = { variables: { username, password } }

    setUsername('')
    setPassword('')
    login(data)
  }

  return page === 'login' ? (
    < div >
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={f(setUsername)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={f(setPassword)}
            placeholder="secret"
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div >
  ) : null
}

export default LoginForm