const mongoose = require('mongoose');
const feedLoadTrialSchema = new mongoose.Schema({
    loadNo: {
        type: String,
        required: true
    },
    feedId: {
        type: String,
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
    comments: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    }



})
module.exports = mongoose.model('FeedBackLoad', feedLoadTrialSchema);