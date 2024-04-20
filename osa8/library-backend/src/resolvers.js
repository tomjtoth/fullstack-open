const { GraphQLError } = require('graphql');
const Author = require('./models/author');
const Book = require('./models/book');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),

    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (_root, { author, genre }) => {
      const foundAuthor = await Author.findOne({ name: author });
      const books = Array.from(await Book.find().populate('author'));

      return books
        .filter(
          (book) =>
            !foundAuthor ||
            book.author._id.toString() === foundAuthor._id.toString()
        )
        .filter((book) => !genre || book.genres.includes(genre));
    },

    allAuthors: () => {
      const authors = Array.from(Author.find());

      return authors.map((author) => ({
        ...author,
        bookCount: Book.find({ author }).length,
      }));
    },
  },

  Mutation: {
    addBook: async (_root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        author = await author.save();
      }

        const book = new Book({ ...args, author });
        await book.save();
        return book;
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

    editAuthor: async (_root, { name, setBornTo }) => {
      const updatedAuthor = await Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        {
          new: true,
          runValidators: true,
          context: 'query',
        }
      );

      return updatedAuthor;
    },
  },
};

module.exports = resolvers;
