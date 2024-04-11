import { useState } from 'react'
import blogService from '../services/blogs'

const BlogCreationForm = ({ x: { blogs, setBlogs } }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleBlogSubmit = async event => {
        event.preventDefault()

        const created_blog = await blogService
            .createNew({ title, author, url })

        setBlogs(blogs.concat([created_blog]))
    }

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
    )
}

export default BlogCreationForm
