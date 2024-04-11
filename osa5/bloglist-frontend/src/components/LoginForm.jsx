import loginService from '../services/login'

const LoginForm = ({ x: {
    username, setUsername,
    password, setPassword,
    setUser, setErrorMessage
} }) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <form action="/api/login">
            <h2>Log in to application</h2>
            <input
                placeholder="username"
                value={username}
                onChange={({ target: { value } }) => setUsername(value)}
            />
            <input
                placeholder="password"
                type="password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
            />
            <button type="submit" onClick={handleLogin}>login</button>
        </form>
    )
}

export default LoginForm
