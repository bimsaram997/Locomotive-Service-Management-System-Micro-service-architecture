const mongoose = require('mongoose');
const MileageSchema = new mongoose.Schema({
    mReportNumber: {
        type: String,
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
    mLocoMileage: {
        type: Number,
        required: true
    },
    finalMileage: {
        type: Number,
        required: false
    },
    gap: {
        type: Number,
        required: false
    },

    mileageDate: {
        type: String,
        required: true
    },
    managerNic: {
        type: String,
        required: true,
    },
    managerName: {
        type: String,
        required: true,
    },
    managerEmail: {
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
    },
    clerkEmail: {
        type: String,
        required: false
    }

})
module.exports = mongoose.model('Mileage', MileageSchema)