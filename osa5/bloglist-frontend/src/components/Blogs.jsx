import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Blog from "./Blog";
import BlogForm from "./BlogForm";

const Blogs = () => {

  const { blogs, session } = useSelector(({ blogs, session }) => ({ blogs, session }));

  return (
    <>
      {session && <BlogForm />}
      <ul>
        {// Array.sort modifies the original array...
          [...blogs]
            .sort(({ likes: a }, { likes: b }) => b - a)
            .map((blog) =>
              <li>
                <Link key={blog.id} to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link> by {blog.author}
              </li>
            )}
      </ul>
    </>
  );
};

export default Blogs;
