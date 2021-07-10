const mongoos = require('mongoose');

const postSchema = mongoos.Schema({
    title: { type: String, required: true},
    title: { type: String, required: true},
});

module.exports = mongoos.model('Post', postSchema);