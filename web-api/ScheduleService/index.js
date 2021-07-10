const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const accountSid = 'AC3d297c7a3fe526424aa2fc97aaa56128'; // Your Account SID from www.twilio.com/console
const authToken = '19a795c6575eb243f23ce9598a28db56'; // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
const ScheduleRoute = require('./route/ScheduleRoute');
const ProgressRoute = require('./route/ProgressRepRoute');
const LoadTrialRoute = require('./route/LoadTrialRoute');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' }));

mongoose.connect('mongodb://localhost:27017/RailwayProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    app.listen(4002, () => {
        console.log('Schedule Service has been started on port  4002');
    });
}).catch(error => {
    console.log(error);
});

app.use('/api/v1/scheduleRoute', ScheduleRoute);
app.use('/api/v1/progressRoute', ProgressRoute);
app.use('/api/v1/loadTrialRoute', LoadTrialRoute);