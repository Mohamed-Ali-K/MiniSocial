const mongoos = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoos.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
});

userSchema.plugin(uniqueValidator)

module.exports = mongoos.model('User', userSchema);