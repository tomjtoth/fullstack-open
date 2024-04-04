const { test, describe } = require('node:test');
const { strictEqual, deepStrictEqual } = require('node:assert');
const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper');

const WEIRD_MD_URL_ARRAY =
    [{
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }];

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
        strictEqual(totalLikes(WEIRD_MD_URL_ARRAY), 36);
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
        deepStrictEqual(favoriteBlog(WEIRD_MD_URL_ARRAY), [WEIRD_MD_URL_ARRAY[2]]);
    });

    test('larger array works fine with 4 top-liked element', () => {

        const injected = [...WEIRD_MD_URL_ARRAY];

        injected.splice(2, 0,
            WEIRD_MD_URL_ARRAY[2],
            WEIRD_MD_URL_ARRAY[2],
            WEIRD_MD_URL_ARRAY[2]
        );

        deepStrictEqual(favoriteBlog(injected), [
            WEIRD_MD_URL_ARRAY[2],
            WEIRD_MD_URL_ARRAY[2],
            WEIRD_MD_URL_ARRAY[2],
            WEIRD_MD_URL_ARRAY[2]
        ]);
    });
});
