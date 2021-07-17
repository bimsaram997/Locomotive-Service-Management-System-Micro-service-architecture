const mongoose = require('mongoose');
const feedLoadTrialSchema = new mongoose.Schema({
    loadNo: {
        type: String,
        required: true
    },
    locoNumber: {
        type: Number,
        required: true
    },
    locoCatId: {
        type: Number,
        required: true
    },

    items: [{
        comments: {
            type: String,
        },
        checked: {
            type: String,
        },
        action: {
            type: String,
        }
    }],

})
module.exports = mongoose.model('FeedBackLoad', feedLoadTrialSchema);