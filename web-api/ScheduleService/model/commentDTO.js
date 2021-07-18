const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    loadNo: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    locoNumber: {
        type: Number,
        required: true
    },
    commentId: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    comDate: {
        type: String,
        required: true
    },
    checked: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model('Comments', CommentSchema);