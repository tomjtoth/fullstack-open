import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/field";
import { login } from "../reducers/sessionReducer";

const LoginForm = () => {
  const { reset: resetUser, ...username } = useField();
  const { reset: resetPass, ...password } = useField('password');
  const session = useSelector(({ session }) => session);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  if (session) return navigate('/blogs');

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(
      login({
        username: username.value,
        password: password.value,
      }),
    );
    resetUser();
    resetPass();
  };

  return (
    <form action="/api/login">
      <h2>Log in to application</h2>
      username:
      <input {...username}
        name="username" />
      <br />
      password:
      <input {...password}
        name="password" />
      <br />
      <button type="submit" onClick={handleLogin}>
        login
      </button>
    </form>
  );
};

export default LoginForm;
