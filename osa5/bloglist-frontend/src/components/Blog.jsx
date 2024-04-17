import { useState } from "react";

const Blog = ({ blog, like, remove }) => {
  const [expanded, toggleInfo] = useState(false);

  return (
    <li>
      {blog.title} {blog.author}
      <button onClick={() => toggleInfo(!expanded)} className="toggle">
        {expanded ? "collapse" : "expand"}
      </button>
      {expanded && (
        <ul>
          <li>{blog.url}</li>
          <li>
            likes {blog.likes}
            <button onClick={like} className="like">
              like
            </button>
          </li>
          <li>added by {blog.user.name}</li>
          {remove && (
            <button onClick={remove} className="remove">
              remove this
            </button>
          )}
        </ul>
      )}
    </li>
  );
};

// Blog.propTypes = {
//     x: PropTypes.array.isRequired
// };

export default Blog;
