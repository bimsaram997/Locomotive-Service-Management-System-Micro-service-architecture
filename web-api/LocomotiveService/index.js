const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')

const LocomotiveRoute = require('./route/LocomotiveRoute');
const ImageController = require('./controller/ImageController');

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
    app.listen(4001, () => {
        console.log('Loco Service has been started on port  4001');
    });
}).catch(error => {
    console.log(error);
});

app.use('/api/v1/locoRoute', LocomotiveRoute);

app.use('/api/v1/imageController', ImageController);