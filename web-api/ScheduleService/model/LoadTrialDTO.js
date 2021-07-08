const mongoose = require('mongoose');
const LoadTrialSchema = new mongoose.Schema({

    loadNo: {
        type: String,
        required: true
    },
    loadDate: {
        type: String,
        required: true
    },
    loadFrom: {
        type: String,
        required: true
    },
    loadTo: {
        type: String,
        required: true
    },
    scheduleNo: {
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
    supervisorName: {
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
    managerName: {
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
    items: [{
        running: {
            type: String,
        },
        description: {
            type: String,
        },
        condition: {
            type: String,
        },
        action: {
            type: String,
        }
    }],
    itemsStop: [{
        running: {
            type: String,
        },
        description: {
            type: String,
        },
        condition: {
            type: String,
        },
        action: {
            type: String,
        }
    }],
    dynamicBrake: [{
        notch: {
            type: String,
        },
        tractionMtr: {
            type: String,
        },
        condition: {
            type: Number,
        },
        mainGen: {
            type: String,
        }
    }],
    loadNote: {
        type: String,
        required: true
    },
    startMileage: {
        type: String,
        required: false
    },
    endMileage: {
        type: String,
        required: false
    },

})
module.exports = mongoose.model('LoadTrial', LoadTrialSchema);