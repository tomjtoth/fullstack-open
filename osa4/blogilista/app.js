const { MONGODB_URI } = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogRoutes = require('./controllers/blogs');
const userRoutes = require('./controllers/users');
const loginRoutes = require('./controllers/login');
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
} = require('./utils/middleware');
const log = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

log.info('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    log.info('connected to MongoDB');
  })
  .catch((error) => {
    log.error('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use(tokenExtractor);

// use the middleware only in /api/blogs routes
// requiring a sing-in to read blogs === no readers whatsoever
// app.use('/api/blogs', userExtractor, blogsRouter)

app.use(userExtractor);
app.use(requestLogger);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);

if (process.env.NODE_ENV === 'test')
  app.use('/api/testing', require('./controllers/testing'));

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
