import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { useField } from "../hooks/field";

const BlogCreationForm = () => {
  const { reset: reTitle, ...title } = useField();
  const { reset: reAuthor, ...author } = useField();
  const { reset: reUrl, ...url } = useField();
  const dispatch = useDispatch();

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      }),
    );
  };

  return (
    <form action="/api/blogs" method="POST">
      <h2>create new</h2>
      title: <input {...title} />
      <br />
      author: <input {...author} />
      <br />
      url: <input {...url} />
      <br />
      <button type="submit" onClick={handleBlogSubmit}>
        create
      </button>
    </form>
  );
};

export default BlogCreationForm;
