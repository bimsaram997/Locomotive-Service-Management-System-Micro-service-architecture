const express = require('express');
const loadTrialController = require('../controller/LoadTrialController');
const router = express.Router();

router.post('/saveLoadTrial', loadTrialController.saveLoadTrial);
router.get('/getAllLoadTrial', loadTrialController.getAllLoadTrial);
router.get('/getOneLoad/:id', loadTrialController.getOneLoad);

router.put('/addComment', loadTrialController.addComment);
router.post('/makeComment', loadTrialController.makeComment);
router.get('/getLoadComments/:id', loadTrialController.getLoadComments);

router.get('/getOneComment/:id', loadTrialController.getOneComment);
router.patch('/changeStatusComment', loadTrialController.changeStatusComment);
module.exports = router;