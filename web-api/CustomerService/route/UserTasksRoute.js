const express = require('express');
const UserTaskController = require('../controller/UserTaskController');
const router = express.Router();

router.post('/saveTask', UserTaskController.saveTask);
router.get('/getAllTasksAssigned', UserTaskController.getAllTasksAssigned);


module.exports = router;