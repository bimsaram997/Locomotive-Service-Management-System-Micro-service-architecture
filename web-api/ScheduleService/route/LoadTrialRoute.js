const express = require('express');
const loadTrialController = require('../controller/LoadTrialController');
const router = express.Router();
router.post('/saveLoadTrial', loadTrialController.saveLoadTrial);
module.exports = router;