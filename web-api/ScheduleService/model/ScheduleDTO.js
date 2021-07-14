const mongoose = require('mongoose');
const ScheduleSchema = new mongoose.Schema({
    scheduleNo: {
        type: String,
        required: true
    },
    mReportNumber: {
        type: Number,
        required: true
    },
    scheduleDate: {
        type: String,
        required: true
    },
    completedDate: {
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
    locoMileage: {
        type: Number,
        required: true
    },
    locoStatus: {
        type: String,
        required: true
    },
    managerNic: {
        type: String,
        required: true
    },
    managerEmail: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    supervisorNic: {
        type: String,
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
    mechanical: {
        type: String,
        required: false
    },
    electrical: {
        type: String,
        required: false
    },
    mainMotorName: {
        type: Array,
        required: true
    },
    trackMotorName: {
        type: Array,
        required: true
    },
    locoBodyName: {
        type: Array,
        required: true
    },
    otherMotors: [{
        Name: {
            type: String,
        }
    }],
    electricCUnitName: {
        type: Array,
        required: true
    },
    eMechanicalName: {
        type: Array,
        required: true
    },
    eSwitchName: {
        type: Array,
        required: true
    },
    otherElectric: [{
        Name: {
            type: String,
        }
    }],
    specialNote: {
        type: String,
        required: true
    },
    scheduleStatus: {
        type: Number,
        required: true
    },
    schReason: {
        type: String,
        required: false
    },
    scheduleProgress: {
        type: String,
        required: false
    }
});
module.exports = mongoose.model('Schedule', ScheduleSchema);