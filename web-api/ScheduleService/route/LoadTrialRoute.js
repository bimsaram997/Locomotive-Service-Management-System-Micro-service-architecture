const express = require('express');
const loadTrialController = require('../controller/LoadTrialController');
const router = express.Router();

router.post('/saveLoadTrial', loadTrialController.saveLoadTrial);
router.get('/getAllLoadTrial', loadTrialController.getAllLoadTrial);
router.get('/getOneLoad/:id', loadTrialController.getOneLoad);
router.patch('/acceptLoadTrial/:loadNo', loadTrialController.acceptLoadTrial);

router.put('/addComment', loadTrialController.addComment);
router.post('/makeComment', loadTrialController.makeComment);
router.get('/getLoadComments/:id', loadTrialController.getLoadComments);

router.get('/getOneComment/:id', loadTrialController.getOneComment);
router.put('/changeStatusComment', loadTrialController.changeStatusComment);
router.get('/getResolvedComments', loadTrialController.getResolvedComments);

router.post('/addFeedBack', loadTrialController.addFeedBack);
router.get('/getOneFeedBack/:commentId', loadTrialController.getOneFeedBack);
module.exports = router;