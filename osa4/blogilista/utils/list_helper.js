// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => 1;

const totalLikes = (blogs) => blogs.length === 0
    ? 0
    : blogs
        .map(blog => blog.likes)
        .reduce((prev, curr) => prev + curr);

const favoriteBlog = (blogs) => {
    const max_likes = Math.max(...blogs.map(({ likes }) => likes));

    return blogs.filter(({ likes }) => likes === max_likes);
};

module.exports = { dummy, totalLikes, favoriteBlog };
