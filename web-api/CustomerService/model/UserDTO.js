const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userEmail: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'Customer'
    },
    userName: {
        type: String,
        required: false
    },
    userGender: {
        type: String,
        required: false
    },
    userNic: {
        type: String,
        required: false
    },
    userMobile: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    userRole: {
        type: String,
        required: false
    },
    appointmentDate: {
        type: String,
        required: false
    },
    userWorks: {
        type: String,
        required: false
    },


    userPassword: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
});
module.exports = mongoose.model('users', UserSchema)