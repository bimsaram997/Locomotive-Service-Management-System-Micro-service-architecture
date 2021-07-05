const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
   CustomerName:{
       type:String,
       required: true
   },
   CustomerEmail:{
       type:String,
       required: true
   },
   CustomerMobile:{
       type:Number,
       required: true
   },
   CustomerWork:{
     type: String,
     required: true
   },
    CustomerNic:{
       type: String,
        required: true
    },
    CustomerGender:{
       type: String,
        required: true
    },
    CustomerRole: {
       type: String,
        required: true
    },
    CustomerHiredDate: {
       type: String,
        required: true
    }
});

module.exports =  mongoose.model('Customer', CustomerSchema);
