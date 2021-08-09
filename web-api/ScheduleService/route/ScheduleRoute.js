const express = require('express');
const ScheduleController = require('../controller/ScheduleController');
const router = express.Router();
router.post('/saveSchedule', ScheduleController.saveSchedule);
router.get('/getAllSchedules', ScheduleController.getAllSchedules);
router.get('/getAllScheduleAssigned', ScheduleController.getAllScheduleAssigned);
router.get('/getAllCompSchedule', ScheduleController.getAllCompSchedule);
router.delete('/deleteSchedule', ScheduleController.deleteSchedule);
router.put('/updateSchedule', ScheduleController.updateSchedule);
router.get('/getDraftCount', ScheduleController.getDraftCount);
router.get('/getAcceptCount', ScheduleController.getAcceptCount);
router.get('/getCount', ScheduleController.getCount);
router.get('/getSample', ScheduleController.getMySampleData);
router.get('/getSchedule/:customerNic', ScheduleController.getSchedule);
router.get('/sendSMS', ScheduleController.sendSMS);
router.get('/sendOneSchedule/:id', ScheduleController.sendOneSchedule);
router.patch('/patchMileage/:scheduleNo/:progressValue', ScheduleController.patchMileage);
router.get('/getProSchedule/:id', ScheduleController.getProSchedule);
router.get('/getOneSchedule/:scheduleNo', ScheduleController.getOneSchedule);

router.put('/changeScheduleSeven', ScheduleController.changeScheduleSeven);
router.post('/scheduleEmail', ScheduleController.scheduleEmail);


//next Schedule
router.post('/saveNextSchedule', ScheduleController.saveNextSchedule);
router.get('/getAllNextSchedules/:locoNumberNextSchedule', ScheduleController.getAllNextSchedules);
router.get('/getAllNextSchedulesNotFilter', ScheduleController.getAllNextSchedulesNotFilter);
router.get('/sendOneNextSchedule/:nxtSchId', ScheduleController.sendOneNextSchedule);
router.put('/changeStatusNextSchedule', ScheduleController.changeStatusNextSchedule);
module.exports = router