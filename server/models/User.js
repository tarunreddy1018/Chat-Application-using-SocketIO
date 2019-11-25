const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    socketId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);