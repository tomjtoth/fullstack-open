import { useState } from 'react'
import blogSvc from '../services/blogs'
import Blog from './Blog'
import BlogCreationForm from './BlogCreationform'
import UserInfo from './UserInfo'

const BlogForm = ({ x: {
    blogs, setBlogs,
    user, setUser,
    setFeedback
} }) => {

    const [showCreationForm, setShowCreationForm] = useState(false)

    const incrLike = (blog) =>
        blogSvc.incrLike(blog)
            .then(_status => {
                const { id, likes, title } = blog
                setFeedback([`${title} has ${likes + 1} likes now`])
                setBlogs(blogs.map(b => {
                    if (b.id === id)
                        b.likes++
                    return b
                }))
            })
            .catch(e => {
                setFeedback([`updating blog failed: ${e.response.data.error}`, true])
            })

    return (
        <div>
            <h2>blogs</h2>

            {user && <>
                <UserInfo x={{ user, setUser }} />
                <br />
                {showCreationForm && <BlogCreationForm x={{ blogs, setBlogs, setFeedback }} />}
                <button onClick={() => setShowCreationForm(!showCreationForm)}>{
                    showCreationForm
                        ? 'cancel'
                        : 'create new blog'
                }</button>
            </>}

            <ul>
                {blogs.map(blog =>
                    <Blog key={blog.id} x={{ blog, incrLike: incrLike.bind(null, blog) }} />
                )}
            </ul>
        </div>
    )
}


export default BlogForm
