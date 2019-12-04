const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registeredUserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('RegisteredUser', registeredUserSchema);