const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');


const getUserFromToken = async (token, next) => {
    const { id: uid = null } = jwt.verify(token, process.env.SECRET);

    if (!uid)
        return next({
            name: 'AuthErr',
            message: 'invalid token'
        });

    return await User.findById(uid);
};


router.get('/', async (_req, resp) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1, name: 1, _id: 1
    });

    resp.json(blogs);
});


router.post('/', async ({ token, body }, resp, next) => {

    const user = getUserFromToken(token, next);

    const new_blog = new Blog({
        ...body,
        likes: body.likes || 0,
        // get 1st users's ID
        user: user._id
    });

    const savedBlog = await new_blog.save();

    user.blogs.push(savedBlog._id);
    await user.save();

    resp.status(201).json(new_blog);
});


router.delete('/:id', async ({ params: { id }, token }, resp, next) => {
    const user = await getUserFromToken(token, next);

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
