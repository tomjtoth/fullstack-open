import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { likeBlog, removeBlog } from "../reducers/blogReducer"

const Blog = ({ blog }) => {

  const dispatch = useDispatch()

  const session = useSelector(({ session }) => session)

  if (!blog) return null;

  const removeAllowed = session
    && session.username === blog.user.username

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemoval = () => {
    if (confirm(`really delete "${blog.title}" by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  return <>
    <h2>{blog.title}</h2>

    Click <Link to={blog.url}>here</Link> for more info.
    <br />
    {blog.likes} likes <button onClick={handleLike}>like</button>
    <br />
    added by {blog.user.name}

    {removeAllowed &&
      <button onClick={handleRemoval}>remove</button>
    }
  </>


}

export default Blog
