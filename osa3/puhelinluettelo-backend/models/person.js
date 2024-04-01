const mongoose = require('mongoose');
const printf = require('printf');

const
    DB_OPTS = "retryWrites=true&w=majority",

    // docker-compose vs local development
    DB_HOST = process.env.DB_HOST
        || '127.0.0.1',

    // completely change DB at any time
    DB_URL = process.env.DB_URL
        || printf(
            'mongodb://fullstack:%s@%s/?%s',
            process.env.DB_PASS,
            DB_HOST,
            DB_OPTS
        );

mongoose.set('strictQuery', false);
console.log('connecting to', DB_URL)
mongoose.connect(DB_URL)
    .then(_res =>
        console.log('connected to MongoDB'))
    .catch((err) =>
        console.log('error connecting to MongoDB:', err.message));

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
