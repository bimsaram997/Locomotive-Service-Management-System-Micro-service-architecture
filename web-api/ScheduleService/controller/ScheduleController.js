const ScheduleSchema = require('../model/ScheduleDTO');
const accountSid = 'AC3d297c7a3fe526424aa2fc97aaa56128'; // Your Account SID from www.twilio.com/console
const authToken = '19a795c6575eb243f23ce9598a28db56'; // Your Auth Token from www.twilio.com/console
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
const basicAuth = require('express-basic-auth')


const getAllSchedules = (req, resp) => {
    ScheduleSchema.find().then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(error);
    })
}

const deleteSchedule = (req, resp) => {
    ScheduleSchema.deleteOne({ scheduleNo: req.headers.id }).then(result => {
        if (result.deletedCount > 0) {
            resp.status(200).json({ message: 'deleted' });
        } else {
            resp.status(200).json({ message: 'try Again' });
        }
    }).catch(error => {
        resp.status(500).json({ error });
    })
};

const updateSchedule = (req, resp) => {
    ScheduleSchema.updateOne({ scheduleNo: req.body.scheduleNo }, {
        $set: {
            scheduleUpdate: req.body.scheduleUpdate,
            locoCatId: req.body.locoCatId,
            locoNumber: req.body.locoNumber,
            userNic: req.body.userNic,
            userName: req.body.userrName,
            userEmail: req.body.userEmail,
            scheduleStatus: req.body.scheduleStatus,
            scheduleCom: req.body.scheduleCom,
            scheduleTrackMotors: req.body.scheduleTrackMotors,
            scheduleLocoBody: req.body.scheduleLocoBody,
            scheduleElCuUnit: req.body.scheduleElCuUnit,
            scheduleEMechanical: req.body.scheduleEMechanical,
            scheduleMach: req.body.scheduleMach,
            scheduleRemark: req.body.scheduleRemark
        }
    }).then(result => {
        if (result.nModified > 0) {
            resp.status(200).json({ message: 'updated' })
        } else {
            resp.status(200).json({ message: 'Try Again' })
        }
    }).catch(error => {
        resp.status(500).json(error)
    });

}
const getDraftCount = (req, resp) => {
    ScheduleSchema.count({ scheduleStatus: 'draft' }).then(result => {
        resp.status(200).json(result)
    }).catch(error => {
        resp.status(500).json(error);
    })
}
const getAcceptCount = (req, resp) => {
    ScheduleSchema.count({ scheduleStatus: 'Accept' }).then(result => {
        resp.status(200).json(result)
    }).catch(error => {
        resp.status(500).json(error);
    })
}
const getSchedule = (req, resp) => {
    const { customerNic } = ({ customerNic: req.params.customerNic });
    ScheduleSchema.findById(customerNic).then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(result);
    })

}
const getCount = (req, resp) => {
    ScheduleSchema.find({ customerNic: req.body.customerNic }).then(result => {
        resp.status(200).json(result)
    }).catch(error => {
        resp.status(500).json(error);
    })
}
const getMySampleData = (req, resp) => {

    ScheduleSchema.aggregate([{
        $facet: {
            Total: [
                { "$match": { "scheduleStatus": { "$eq": 'Accept' } } },
                { "$count": "Total" }
            ],
            "Total New": [
                { "$match": { "scheduleStatus": { "$eq": 'draft' } } },
                { "$count": "Total" }
            ]
        }
    }]).then(result => {
        console.log(result)
        resp.status(200).json(result)
    }).catch(error => {
        resp.status(500).json(error);
    })

}
const sendSMS = (req, resp) => {
    client.messages.create({
            body: 'Schedule is Accepted',
            to: '+94768922413', // Text this number
            from: '+13343779253' // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));

}
const saveSchedule = async(req, res, next) => {

    ScheduleSchema.findOne({ scheduleNo: req.body.scheduleNo }).then(result => {
        if (result == null) {
            const schedule = new ScheduleSchema(req.body);
            schedule.save().then(result => {
                res.status(200).json({ isSaved: true, data: result })
            }).catch(error => {
                res.status(500).json(error);
            })
        } else {
            res.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        res.status(500).json(er);
    });



    console.log('awa')
    console.log(req.body)
}

const sendOneSchedule = (req, res) => {
    console.log(req.params.id);
    ScheduleSchema.find({
        _id: req.params.id
    }).then(result => {
        res.status(200).json(result);

    }).catch(er => {
        res.status(500).json(er);
    });


}

const patchMileage = async(req, res, next) => {
    console.log(req.params.scheduleNo, req.params.progressValue)
    if (req.params.scheduleNo) {
        if (req.params.progressValue == 100) {
            await ScheduleSchema.updateOne({ scheduleNo: req.params.scheduleNo }, { $set: { scheduleStatus: 4, scheduleProgress: req.params.progressValue } }, function(err, result) {

                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json(result)
                }

            })
        } else if (req.params.progressValue == 60) {
            await ScheduleSchema.updateOne({ scheduleNo: req.params.scheduleNo }, { $set: { scheduleStatus: 2, scheduleProgress: req.params.progressValue } }, function(err, result) {

                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json(result)
                }

            })
        }


    }

}
module.exports = {
    saveSchedule,
    getAllSchedules,
    deleteSchedule,
    updateSchedule,
    getDraftCount,
    getAcceptCount,
    getSchedule,
    getCount,
    getMySampleData,
    sendSMS,
    sendOneSchedule,
    patchMileage
}