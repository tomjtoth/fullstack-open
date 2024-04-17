import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks/field";
import { login } from "../reducers/userReducer";

const LoginForm = () => {
  const { reset: resetUser, ...username } = useField();
  const { reset: resetPass, ...password } = useField('password');
  const user = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login());
  }, []);

  if (user) return null;

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
      <input {...username} />
      <br />
      password:
      <input {...password} />
      <br />
      <button type="submit" onClick={handleLogin}>
        login
      </button>
    </form>
  );
};

export default LoginForm;
