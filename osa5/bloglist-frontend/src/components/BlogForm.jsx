import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs, likeBlog, removeBlog } from "../reducers/blogReducer";
import { logout } from "../reducers/userReducer";
import Blog from "./Blog";
import BlogCreationForm from "./BlogCreationform";

const BlogForm = () => {
  const dispatch = useDispatch();
  // this is only a local boolean to remember if showing the form
  const [showForm, toggleForm] = useState(false);
  const { blogs, user } = useSelector(({ blogs, user }) => ({ blogs, user }));

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  const likeBlogHandler = (blog) => () => {
    dispatch(likeBlog(blog));
  };

  const removeBlogHandler = (blog) => () => {
    if (confirm(`really delete "${blog.title}" by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  return (
    <div>
      <h2>blogs</h2>

      {user && (
        <>
          <p>{user.name} logged in</p>
          <button
            onClick={() => {
              dispatch(logout());
              localStorage.removeItem("user");
            }}
          >
            logout
          </button>
          <br />
          {showForm && <BlogCreationForm />}
          <button onClick={() => toggleForm(!showForm)}>
            {showForm ? "cancel" : "create new blog"}
          </button>
        </>
      )}

      <ul>
        {
          // Arry.sort modifies the original array...
          [...blogs]
            .sort(({ likes: a }, { likes: b }) => b - a)
            .map((blog) => {
              const props = {
                key: blog.id,
                blog,
                like: likeBlogHandler(blog),
                remove:
                  user &&
                  user.username === blog.user.username &&
                  removeBlogHandler(blog),
              };
              return <Blog {...props} />;
            })}
      </ul>
    </div>
  );
};

export default BlogForm;
