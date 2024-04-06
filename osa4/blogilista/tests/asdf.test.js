const { notEqual, strictEqual, deepStrictEqual } = require('node:assert');
const { test, beforeEach, after, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
} = require('../utils/list_helper');
const api = supertest(require('../app'));
const { initialBlogs, populateDb } = require('./test_helper');


test('dummy returns one', () => {
    const blogs = [];

    const result = dummy(blogs);
    strictEqual(result, 1);
});

describe('total likes', () => {

    test('empty array returns 0', () => {
        strictEqual(totalLikes([]), 0);
    });

    test('array of 1 blog equals 1st elements\' likes', () => {
        strictEqual(
            totalLikes([
                {
                    _id: '5a422aa71b54a676234d17f8',
                    title: 'Go To Statement Considered Harmful',
                    author: 'Edsger W. Dijkstra',
                    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                    likes: 5,
                    __v: 0
                }
            ]), 5
        );
    });

    test('3+4+5 == 12', () => {
        strictEqual(
            totalLikes([
                // we only care about likes, YoLo
                { likes: 3 },
                { likes: 4 },
                { likes: 5 },
            ]), 12
        );
    });

    test('array from weird .md URL returns 36', () => {
        strictEqual(totalLikes(initialBlogs), 36);
    });

});

describe('assignments 4.5+', () => {
    test('empty array\'s favorite is an empty array', () => {
        deepStrictEqual(favoriteBlog([]), []);
    });

    test('array of 2 with equal likes returns both', () => {
        const arr = [{ name: 1, likes: 10 }, { name: 2, likes: 10 }];

        deepStrictEqual(favoriteBlog(arr), arr);
    });


    test('larger array works fine with 1 top-liked element', () => {
        deepStrictEqual(favoriteBlog(initialBlogs), [initialBlogs[2]]);
    });

    test('larger array works fine with 4 top-liked element', () => {

        const injected = [...initialBlogs];

        injected.splice(2, 0,
            initialBlogs[2],
            initialBlogs[2],
            initialBlogs[2]
        );

        deepStrictEqual(favoriteBlog(injected), [
            initialBlogs[2],
            initialBlogs[2],
            initialBlogs[2],
            initialBlogs[2]
        ]);
    });

    test('return most popular author', () => {
        deepStrictEqual(mostBlogs(initialBlogs), [{
            author: initialBlogs[3].author,
            blogs: 3
        }]);
    });

    test('most popular of empty list is []', () => {
        deepStrictEqual(mostBlogs([]), []);
    });


    test('mostBlogs reutrns both top-authors', () => {

        const modified = [...initialBlogs, initialBlogs[2]];

        deepStrictEqual(mostBlogs(modified), [
            {
                author: initialBlogs[2].author,
                blogs: 3
            },
            {
                author: initialBlogs[3].author,
                blogs: 3
            }
        ]);
    });

    test('return correct author with mostLikes', () => {
        deepStrictEqual(mostLikes(initialBlogs), [{
            author: initialBlogs[2].author,
            likes: 17
        }]);
    });


    test('mostLikes of empty list is []', () => {
        deepStrictEqual(mostBlogs([]), []);
    });


    test('mostLikes reutrns both top-authors', () => {

        const modified = [...initialBlogs, {
            ...initialBlogs[0],
            likes: 10
        }];

        deepStrictEqual(mostLikes(modified), [
            {
                author: initialBlogs[0].author,
                likes: 17
            },
            {
                author: initialBlogs[2].author,
                likes: 17
            }
        ]);
    });

});

describe('actual DB queries involved in tests', () => {

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


    after(async () => {
        await mongoose.connection.close();
    });

});
