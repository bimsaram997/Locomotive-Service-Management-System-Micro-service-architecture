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
    locoCatId: {
        type: String,
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
    scheduleNo: {
        type: String,
        required: true
    },
    supervisorEmail: {
        type: String,
        required: false,
    },
    chiefEngEmail: {
        type: String,
        required: false,
    },
    loadSid: {
        type: String,
        required: false,
    }
})
module.exports = mongoose.model('Comments', CommentSchema);