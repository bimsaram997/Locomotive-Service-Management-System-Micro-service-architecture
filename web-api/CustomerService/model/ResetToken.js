const mongoose = require('mongoose');


const resetTokenSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',

    },
    resettoken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 432000
    }
})
module.exports = mongoose.model('passResetToken', resetTokenSchema);