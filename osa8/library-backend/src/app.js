require('dotenv').config();

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');

const resolvers = require('./resolvers');
const typeDefs = require('./typedefs');

mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.MONGODB_URI;

const app = () => {
  console.log('connecting to', MONGODB_URI);

  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message);
    });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

module.exports = app;
