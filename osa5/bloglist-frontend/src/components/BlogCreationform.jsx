import { useState } from 'react';

const BlogCreationForm = ({ x: { blogs, setBlogs, blogSvc, setFeedback } }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleBlogSubmit = event => {
        event.preventDefault();

        blogSvc
            .createNew({ title, author, url })
            .then(created_blog => {
                setBlogs(blogs.concat([created_blog]));
                setFeedback(['creating new blog succeeded']);
            })
            .catch(e => setFeedback([`creating new blog failed: ${e.response.data.error}`, true]));
    };

    return (
        <form action="/api/blogs" method='POST'>
            <h2>create new</h2>
            title: <input
                value={title}
                onChange={({ target: { value } }) => setTitle(value)}
            />
            <br />
            author: <input
                value={author}
                onChange={({ target: { value } }) => setAuthor(value)}
            />
            <br />
            url: <input
                value={url}
                onChange={({ target: { value } }) => setUrl(value)}
            />
            <br />
            <button type="submit" onClick={handleBlogSubmit}>create</button>
        </form>
    );
};

export default BlogCreationForm;
