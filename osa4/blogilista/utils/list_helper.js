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

const mostBlogs = (blogs) => {
    const authors = {};
    let most_publications = 0;

    blogs.forEach(({ author }) => {

        // eslint-disable-next-line no-prototype-builtins
        if (!authors.hasOwnProperty(author))
            authors[author] = 0;

        // TiRa
        if (++authors[author] > most_publications)
            most_publications++;
    });

    return Array.from(Object.entries(authors))
        // eslint-disable-next-line no-unused-vars
        .filter(([_author, publications]) =>
            publications === most_publications)
        .map(([author, blogs]) => {
            return { author, blogs };
        });
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
