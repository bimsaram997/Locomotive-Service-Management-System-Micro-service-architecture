const mongoose = require('mongoose');
const EmailSchema = new mongoose.Schema({
    sendEmail:{
        type: String,
        required: true
    },
    receiveEmail:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('email', EmailSchema)
