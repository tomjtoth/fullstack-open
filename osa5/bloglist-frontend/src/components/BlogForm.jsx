import Blog from './Blog'

const BlogForm = ({ x: { blogs, user, setUser } }) => {

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <button onClick={() => {
                setUser(null)
                localStorage.removeItem('user')
            }}>logout</button>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogForm
