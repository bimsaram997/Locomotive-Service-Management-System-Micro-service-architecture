const express = require('express');
const ScheduleController = require('../controller/ScheduleController');
const router = express.Router();
router.post('/saveSchedule', ScheduleController.saveSchedule);
router.get('/getAllSchedules', ScheduleController.getAllSchedules);
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
router.get('/getProSchedule/:id', ScheduleController.getProSchedule)
module.exports = router