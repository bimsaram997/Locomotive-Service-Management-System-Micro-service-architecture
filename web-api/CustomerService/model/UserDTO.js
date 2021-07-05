const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userEmail:{
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'Customer'
    },
    userName: {
        type: String,
        required: true
    },
    userWorks: {
        type: String,
        required: true
    },
    userNic: {
        type: String,
        required: true
    },
    userMobile: {
        type: String,
        required: true
    },
    userRole: {
      type: String,
      required: true
    },
    userPassword: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('user', UserSchema)

