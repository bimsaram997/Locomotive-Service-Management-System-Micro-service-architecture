const mongoose = require('mongoose');
const UserTasksSchema = new mongoose.Schema({
    userNic: {
        type: String,
        required: false
    },
    taskId: {
        type: String,
        required: true
    },
    recordId: {
        type: String,
        required: false
    },
    taskType: {
        type: String,
        required: false
    },
    taskPriority: {
        type: String,
        required: false
    },
    taskDate: {
        type: String,
        required: false
    },
    taskStatus: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('UserTask', UserTasksSchema);