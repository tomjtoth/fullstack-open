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


module.exports = router;
