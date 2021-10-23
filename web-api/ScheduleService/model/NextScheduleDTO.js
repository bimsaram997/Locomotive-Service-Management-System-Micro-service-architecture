const mongoose = require('mongoose');
const NextScheduleSchema = new mongoose.Schema({
    nxtSchId: {
        type: String,
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
    date: {
        type: String,
        required: true
    },
    nxtSchStatus: {
        type: Number,
        required: true
    },
    nxtSchReason: {
        type: String,
        required: true
    },
    startMileage: {
        type: Number,
        required: false
    },
    endMileage: {
        type: Number,
        required: false
    },
    supervisorEmail: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('NextSchedule', NextScheduleSchema);