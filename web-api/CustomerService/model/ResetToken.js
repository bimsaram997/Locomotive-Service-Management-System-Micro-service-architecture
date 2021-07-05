const mongoose = require('mongoose');


const resetTokenSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, required: true,
        ref: 'user',

    },
    resetToken: {
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,expires:43200
    }
})
module.exports = mongoose.model('passResetToken', resetTokenSchema);
