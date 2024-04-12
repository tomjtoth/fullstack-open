import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ x: {
    username, setUsername,
    password, setPassword,
    setUser, setFeedback
} }) => {

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            localStorage.setItem('user', JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
            setFeedback(['login succeeded']);
        } catch (e) {
            setFeedback([`login failed: ${e.response.data.error}`, true]);
        }
    };

    return (
        <form action="/api/login">
            <h2>Log in to application</h2>
            <input
                placeholder="username"
                value={username}
                onChange={({ target: { value } }) => setUsername(value)}
            />
            <br />
            <input
                placeholder="password"
                type="password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
            />
            <br />
            <button type="submit" onClick={handleLogin}>login</button>
        </form>
    );
};

export default LoginForm;
