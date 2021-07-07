const mongoose = require('mongoose');
const MileageSchema = new mongoose.Schema({
    mReportNumber:{
        type: Number,
        required: true
    },
    mLocoCatId:{
        type: String,
        required: true,
    },
    mLocoNumber:{
        type: Number,
        required: true
    },
    mLocoMileage:{
        type: Number,
        required: true
    },
    mileageDate:{
        type: String,
        required: true
    },
    userNic:{
        type: String,
        required: true,
    },
    userEmail:{
        type: String,
        required: true,
    },
    mileageNote:{
        type: String,
        required: true,
    },
    status:{
        type: Number,
        required: true,
    },
    reason:{
        type: String,
        required: false
    }

})
module.exports = mongoose.model('Mileage', MileageSchema)
