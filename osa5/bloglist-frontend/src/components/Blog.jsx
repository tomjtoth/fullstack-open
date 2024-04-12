import { useState } from "react"

const Blog = ({ x: { blog, incrLike } }) => {
  const [visible, setVisible] = useState(false)

  return (
    <li>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{
        visible
          ? 'collapse'
          : 'expand'
      }</button>
      {visible && <ul>
        <li>
          {blog.url}
        </li>
        <li>
          likes {blog.likes}
          <button
            onClick={incrLike}
          >like</button>
        </li>
        <li>
          added by {blog.user.name}
        </li>
      </ul>
      }
    </li>
  )
}

export default Blog
