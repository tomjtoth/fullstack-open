const router = require('express').Router();
const Blog = require('../models/blog');


router.get('/', async (_req, resp) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1, name: 1, _id: 1
    });

    resp.json(blogs);
});


router.post('/', async ({ body, user = null }, resp, next) => {

    if (!user)
        return next({
            name: 'AuthErr',
            message: 'must be signed in to create new blogs'
        });

    const new_blog = new Blog({
        ...body,
        likes: body.likes || 0,
        // get 1st users's ID
        user: user._id
    });

    const savedBlog = await new_blog.save();

    user.blogs.push(savedBlog._id);
    await user.save();

    savedBlog.user = user;

    resp.status(201).json(savedBlog);
});


router.delete('/:id', async ({ params: { id }, user = null }, resp, next) => {

    if (!user)
        return next({
            name: 'AuthErr',
            message: 'must be signed in to delete blogs'
        });

    const blog = await Blog.findById(id);

    if (blog.user._id.toString() !== user._id.toString())
        return next({
            name: 'AuthErr',
            message: 'you SHALL NOT DELETE!'
        });

    user.blogs = user.blogs.filter(bid => bid !== blog._id);
    await Promise.all([
        user.save(),
        Blog.deleteOne({ _id: id })
    ]);

    resp.status(204).end();
});


router.put('/:id', async ({ params: { id }, body: { likes } }, resp) => {
    await Blog.updateOne(
        { _id: id },
        { likes },
        {
            runValidators: true,
            context: 'query'
        }
    );

    resp.status(204).end();
});


module.exports = router;
