import { useState } from 'react';
import blogSvc from '../services/blogs';
import Blog from './Blog';
import BlogCreationForm from './BlogCreationform';
import UserInfo from './UserInfo';

const BlogForm = ({ x: {
    blogs, setBlogs,
    user, setUser,
    setFeedback
} }) => {

    const [showCreationForm, setShowCreationForm] = useState(false);

    const incrLike = (blog) =>
        blogSvc.incrLike(blog)
            .then(_status => {
                const { id, likes, title } = blog;
                setBlogs(blogs.map(b => {
                    if (b.id === id)
                        b.likes++;
                    return b;
                }));
                setFeedback([`${title} has ${likes + 1} likes now`]);
            })
            .catch(e => {
                setFeedback([`updating blog failed: ${e.response.data.error}`, true]);
            });

    const delBlog = (blog) => {
        if (confirm(`really delete "${blog.title}" by ${blog.author}?`))
            blogSvc.delBlog(blog)
                .then(_status => {
                    setBlogs(blogs.filter(({ id }) => id !== blog.id));
                    setFeedback([`removed "${blog.title}" by ${blog.author}`]);
                })
                .catch(e => {
                    setFeedback([`removal failed: ${e.response.data.error}`, true]);
                });
    };


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
                {blogs
                    .sort(({ likes: a }, { likes: b }) => {
                        if (a < b) return 1;
                        if (a > b) return -1;
                        return 0;
                    })
                    .map(blog =>
                        <Blog
                            key={blog.id}
                            x={[
                                blog,
                                incrLike.bind(null, blog),
                                user && user.username === blog.user.username
                && delBlog.bind(null, blog)
                            ]} />
                    )}
            </ul>
        </div>
    );
};


export default BlogForm;
