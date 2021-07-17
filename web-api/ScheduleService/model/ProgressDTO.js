const mongoose = require('mongoose');
const ProgressSchema = new mongoose.Schema({
    scheduleNo: {
        type: String,
        required: true
    },
    progressReportNumber: {
        type: String,
        required: true
    },
    locoCatId: {
        type: String,
        required: true
    },
    locoNumber: {
        type: Number,
        required: true
    },
    supervisorEmail: {
        type: String,
        required: true
    },
    supervisorName: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    managerEmail: {
        type: String,
        required: true
    },
    progressDate: {
        type: String,
        required: true
    },
    checkArray: {
        type: Array,
        required: true
    },
    progressValue: {
        type: Number,
        required: false
    },
    extraNote: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('ProgressReport', ProgressSchema);