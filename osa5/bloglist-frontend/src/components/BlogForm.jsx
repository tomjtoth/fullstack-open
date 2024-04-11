import Blog from './Blog'
import BlogCreationForm from './BlogCreationform'
import UserInfo from './UserInfo'

const BlogForm = ({ x: { blogs, setBlogs, user, setUser } }) => (
    <div>
        <h2>blogs</h2>

        <UserInfo x={{ user, setUser }} />

        <BlogCreationForm x={{ blogs, setBlogs }} />

        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
)


export default BlogForm
