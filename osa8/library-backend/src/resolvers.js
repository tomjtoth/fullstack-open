const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),

    authorCount: async () => await Author.collection.countDocuments(),

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

    allAuthors: async () => {
      const authors = Array.from(await Author.find());
      const books = Array.from(await Book.find().populate('author'));

      return authors.map(({ name, born, _id }) => ({
        name,
        born,
        bookCount: books.filter(
          (b) => b.author._id.toString() === _id.toString()
        ).length,
      }));
    },

    me: (_root, args, { currentUser }) => currentUser,
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

    createUser: async (_root, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: username,
            error,
          },
        });
      });
    },

    login: async (_root, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new GraphQLError('user not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      // oversimplified hard-coded pw for all in this task
      if (password !== 'secret') {
        throw new GraphQLError('wrong password', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

module.exports = resolvers;
