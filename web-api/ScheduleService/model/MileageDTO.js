const mongoose = require('mongoose');
const MileageSchema = new mongoose.Schema({
    mReportNumber: {
        type: Number,
        required: true
    },
    mLocoCatId: {
        type: String,
        required: true,
    },
    mLocoNumber: {
        type: Number,
        required: true
    },
    finalMileage: {
        type: Number,
        required: false
    },
    mLocoMileage: {
        type: Number,
        required: true
    },
    nxtScheduleId: {
        type: String,
        required: false
    },
    emergencyCheck: {
        type: String,
        required: false
    },
    mileageDate: {
        type: String,
        required: true
    },
    userNic: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    mileageNote: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    reason: {
        type: String,
        required: false
    }

})
module.exports = mongoose.model('Mileage', MileageSchema)