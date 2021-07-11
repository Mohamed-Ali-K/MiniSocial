const mongoos = require('mongoose');

const postSchema = mongoos.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    imagePath: { type: String, required: true }
});

module.exports = mongoos.model('Post', postSchema);