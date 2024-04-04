const { model, Schema } = require('mongoose');

module.exports = model('Blog', Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
}));
