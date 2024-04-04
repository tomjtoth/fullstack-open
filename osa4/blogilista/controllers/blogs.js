const router = require('express').Router();
const Blog = require('../models/blog');


router.get('/', (_req, resp) =>
    Blog
        .find({})
        .then(blogs =>
            resp.json(blogs)));


router.post('/', (req, resp) =>
    new Blog(req.body)
        .save()
        .then(res =>
            resp.status(201).json(res)));


module.exports = router;
