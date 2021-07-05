const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')


const CustomerRoute = require('./route/CustomerRoute');
const UserRoute = require('./route/UserRoute');

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(cors());


mongoose.connect('mongodb://localhost:27017/RailwayProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    app.listen(4000, () => {
        console.log('Customer Service has been started on port  4000');
    });
}).catch(error => {
    console.log(error);
});



app.use('/api/v1/customerRoute', CustomerRoute)
app.use('/api/v1/accessRoute', UserRoute);
