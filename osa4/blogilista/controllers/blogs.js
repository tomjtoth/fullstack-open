const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const getTokenFrom = req => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
}


router.get('/', async (_req, resp) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1, name: 1, _id: 1
    });

    resp.json(blogs);
});


router.post('/', async (req, resp, next) => {
    const { id: uid = null } = jwt.verify(getTokenFrom(req), process.env.SECRET);

    if (!uid)
        return next({
            name: 'AuthErr',
            message: 'invalid token'
        });

    const user = await User.findById(uid);

    const new_blog = new Blog({
        ...req.body,
        likes: req.body.likes || 0,
        // get 1st users's ID
        user: user._id
    });

    const savedBlog = await new_blog.save();

    user.blogs.push(savedBlog._id);
    await user.save();

    resp.status(201).json(new_blog);
});


router.delete('/:id', async ({ params: { id } }, resp) => {
    await Blog.deleteOne({ _id: id });

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
