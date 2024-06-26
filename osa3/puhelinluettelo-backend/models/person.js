const mongoose = require('mongoose');

const DB_OPTS = 'retryWrites=true&w=majority',
  // docker-compose vs local development
  DB_HOST = process.env.DB_HOST || '127.0.0.1',
  DB_PASS = process.env.DB_PASS,
  DB_URL = `mongodb://${
    DB_PASS
      ? // the docker image of mongo works when I connect to it from outside of
        // docker, but if I try to connect from another container,
        // the user is not found any longer.
        // omitting auth between the 2 containers should be fine
        // will investigate this in the far future
        `fullstack:${DB_PASS}@`
      : ''
  }${DB_HOST}/?${DB_OPTS}`;

mongoose.set('strictQuery', false);
console.log('connecting to', DB_URL);
mongoose
  .connect(DB_URL)
  .then(() => console.log('connected to MongoDB'))
  .catch((err) => console.log('error connecting to MongoDB:', err.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(:?\d{2}-\d{6,}|\d{3}-\d{5,})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
