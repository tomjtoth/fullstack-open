const { notEqual, strictEqual, deepStrictEqual } = require('node:assert');
const { test, beforeEach, after, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const api = supertest(require('../app'));
const {
    initialBlogs,
    populateDb,
    blogsInDb,
    dummyBlog,
    BLOG_FIELD_PRESETS
} = require('./test_helper');


describe('tests involving actual DB queries', () => {

    beforeEach(populateDb);

    test('right amount of blogs are returned as json', async () => {
        const blogs = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        strictEqual(blogs.body.length, initialBlogs.length);
    });

    test('id property is present on blogs', async () => {
        const { body: [{ id, _id }] } = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        // it's enough to check the 1st blog
        notEqual(id, undefined);
        strictEqual(_id, undefined);
    });

    test('POST /api/blogs returns blog w/ correct contents', async () => {
        const new_blog = dummyBlog();

        const { body: saved_blog } = await api
            .post('/api/blogs')
            .send(new_blog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        deepStrictEqual({ ...new_blog, id: saved_blog.id }, saved_blog);

        const blogs_now = await blogsInDb();
        strictEqual(blogs_now.length, initialBlogs.length + 1);
    });

    test('`likes` defaults to 0 if undefined', async () => {
        const new_blog = dummyBlog(0b111);

        const { body: saved_blog } = await api
            .post('/api/blogs')
            .send(new_blog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        deepStrictEqual({
            ...new_blog,
            id: saved_blog.id,
            likes: 0
        }, saved_blog);

    });

    test('POST => HTTP400 if missing author/title/url fields', async () => {
        for (const missing_field of [0, 1, 2]) {

            const
                field_name
                    = BLOG_FIELD_PRESETS[missing_field][0],
                expected_error
                    = `Blog validation failed: ${field_name}: Path \`${field_name}\` is required.`;


            const { body: { error } } = await api
                .post('/api/blogs')
                .send(dummyBlog(0b111 - Math.pow(2, missing_field)))
                .expect(400)
                .expect('Content-Type', /application\/json/);

            strictEqual(error, expected_error);
        }
    });

    test('DELETE => HTTP 204 upon success', async () => {
        const deleted_id = initialBlogs[0]._id;

        await api
            .delete(`/api/blogs/${deleted_id}`)
            .expect(204);

        strictEqual(
            (await blogsInDb())
                .find(({ id }) => id === deleted_id),
            undefined
        );
    });


    test('DELETE => HTTP 400 upon failure', async () => {
        await api
            .delete('/api/blogs/omena')
            .expect(400);

        strictEqual(
            (await blogsInDb()).length,
            initialBlogs.length
        );
    });


    test('PUT => HTTP 204 upon success', async () => {
        const updated_id = initialBlogs[0]._id;

        await api
            .put(`/api/blogs/${updated_id}`)
            .send({ likes: 999 })
            .expect(204);

        strictEqual(
            (await blogsInDb())
                .find(({ id }) => id === updated_id)
                .likes,
            999
        );
    });


    test('PUT => HTTP 400 upon failure', async () => {
        await api
            .put('/api/blogs/omena')
            .send({ likes: 999 })
            .expect(400);
    });


    after(async () => {
        await mongoose.connection.close();
    });

});
