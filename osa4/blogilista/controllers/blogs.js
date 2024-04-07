const router = require('express').Router();
const Blog = require('../models/blog');


router.get('/', async (_req, resp) => {
    const blogs = await Blog.find({});

    resp.json(blogs);
});


router.post('/', async ({ body }, resp) => {
    const new_blog = new Blog({
        ...body,
        likes: body.likes || 0
    });
    await new_blog.save();

    resp.status(201).json(new_blog);
});


router.delete('/:id', async ({ params: { id } }, resp) => {
    await Blog.deleteOne({ _id: id });

    resp.status(204).end();
});


module.exports = router;
