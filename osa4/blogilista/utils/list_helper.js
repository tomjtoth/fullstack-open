// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => 1;

const totalLikes = (blogs) => blogs.length === 0
    ? 0
    : blogs
        .map(blog => blog.likes)
        .reduce((prev, curr) => prev + curr);

module.exports = { dummy, totalLikes };
