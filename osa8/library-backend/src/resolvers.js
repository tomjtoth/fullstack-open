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
        try {
          author = new Author({ name: args.author });
          author = await author.save();
        } catch (error) {
          throw new GraphQLError('Adding author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      try {
        const book = new Book({ ...args, author });
        await book.save();
        return book;
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        });
      }
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
