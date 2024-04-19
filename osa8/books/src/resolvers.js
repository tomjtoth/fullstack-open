const { v1: uuid } = require('uuid');
const { books, authors } = require('../dummy_data');

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_root, args) => {
      let result = books;

      if (args && args.author)
        result = result.filter((b) => b.author === args.author);

      if (args && args.genre)
        result = result.filter((b) => b.genres.includes(args.genre));

      return result;
    },
    allAuthors: () =>
      authors.map((a) => ({
        ...a,
        bookCount: books.filter((b) => b.author === a.name).length,
      })),
  },

  Mutation: {
    addBook: (_root, args) => {
      const book = { ...args, id: uuid() };
      const author = args.author;
      if (!authors.find((a) => a.name === author))
        authors.push({ name: author, id: uuid() });
      books.push(book);
      return book;
    },

    editAuthor: (_root, { name, setBornTo }) => {
      const author = authors.find((a) => a.name === name);
      if (author) {
        author.born = setBornTo;
        return author;
      }
      return null;
    },
  },
};

module.exports = resolvers;
