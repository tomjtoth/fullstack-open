require('dotenv').config();

const PORT = process.env.PORT || 3001,
  DB_OPTS = 'retryWrites=true&w=majority',
  // docker-compose vs local development
  DB_HOST = process.env.DB_HOST || '127.0.0.1',
  DB_PASS = process.env.DB_PASS,
  DB_NAME = process.env.NODE_ENV === 'test' ? 'test' : '',
  MONGODB_URI = `mongodb://${
    DB_PASS
      ? // the docker image of mongo works when I connect to it from outside of
        // docker, but if I try to connect from another container,
        // the user is not found any longer.
        // omitting auth between the 2 containers should be fine
        // will investigate this in the far future
        `fullstack:${DB_PASS}@`
      : ''
  }${DB_HOST}/${DB_NAME}?${DB_OPTS}`;

module.exports = { MONGODB_URI, PORT };
