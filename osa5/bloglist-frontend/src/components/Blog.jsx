import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ x: [blog, incrLike, delBlog] }) => {
    const [visible, setVisible] = useState(false);

    return (
        <li>
            {blog.title} {blog.author}
            <button
                onClick={() => setVisible(!visible)}
                className="toggle">{
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
                        className="like"
                    >like</button>
                </li>
                <li>
                    added by {blog.user.name}
                </li>
                {delBlog && <button
                    onClick={delBlog}
                    className="remove">remove this</button>}
            </ul>
            }
        </li>
    );
};

Blog.propTypes = {
    x: PropTypes.array.isRequired
};

export default Blog;
