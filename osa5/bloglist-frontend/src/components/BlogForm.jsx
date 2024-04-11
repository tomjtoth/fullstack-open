import { useState } from 'react'
import Blog from './Blog'
import BlogCreationForm from './BlogCreationform'
import UserInfo from './UserInfo'

const BlogForm = ({ x: {
    blogs, setBlogs,
    user, setUser,
    setFeedback
} }) => {

    const [showCreationForm, setShowCreationForm] = useState(false)

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
                    <Blog key={blog.id} blog={blog} />
                )}
            </ul>
        </div>
    )
}


export default BlogForm
