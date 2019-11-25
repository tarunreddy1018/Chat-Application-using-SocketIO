const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: [
            {
                type: String,
                required: true
            }
        ],
        required: true
    },
    messages: [
        {
            user: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Room', roomSchema);