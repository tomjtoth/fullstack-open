import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../reducers/sessionReducer"

const Navbar = () => {

  const dispatch = useDispatch()
  const session = useSelector(({ session }) => session)

  return (
    <nav>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      {session
        ? <div className="auth">
          <i>
            {session.name} logged in
          </i>
          <button className="login"
            onClick={() => {
              dispatch(logout());
            }}>
            logout
          </button>
        </div>
        : <Link className="auth" to="/login">login</Link>
      }
    </nav>
  )
}

export default Navbar
