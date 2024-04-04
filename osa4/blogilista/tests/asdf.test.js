const { test, describe } = require('node:test');
const { strictEqual } = require('node:assert');
const { dummy } = require('../utils/list_helper');

test('dummy returns one', () => {
    const blogs = [];

    const result = dummy(blogs);
    strictEqual(result, 1);
});
