const { Schema, model } = require('mongoose');


const InvalidToken = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    expire_at: {
        type: Date,
        default: Date.now,
        expires: 6600 /* 1h */
    }
});

module.exports = model('InvalidToken', InvalidToken)