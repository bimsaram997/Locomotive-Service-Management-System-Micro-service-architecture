const express = require('express');
const LocomotiveController = require('../controller/LocomotiveController');

const router = express.Router();

router.get('/getAllLocomotives', LocomotiveController.getAllLocomotives);
router.get('/getAllLocosSelect', LocomotiveController.getAllLocosSelect);
router.delete('/deleteLoco', LocomotiveController.deleteLoco);
router.put('/updateLocomotive', LocomotiveController.updateLocomotive);
router.post('/save-locomotive', LocomotiveController.saveReactiveLoco);
router.post('/sendLocomotiveAssigned', LocomotiveController.sendLocomotiveAssigned);
router.get('/getOneLoco/:id', LocomotiveController.getOneLoco);
router.get('/getLocoByLocoNumber/:locoNumber', LocomotiveController.getLocoByLocoNumber);
router.get('/getLocoNum/:locoNumber', LocomotiveController.getLocoNum);
router.get('/getLocoReport', LocomotiveController.getLocoReport);
router.get('/getOneLocoNew/:mLocoNumber', LocomotiveController.getOneLocoNew);
router.post('/sendLocoStatus', LocomotiveController.sendLocoStatus);
router.post('/sendStatusEmail', LocomotiveController.sendPassEmail);
router.get('/getlocoSche/:id', LocomotiveController.getLocoSch);
router.get('/getAllLocoAssigned', LocomotiveController.getAllLocoAssigned);
router.get('/getData', LocomotiveController.getData);
router.put('/acceptLoadLoco', LocomotiveController.acceptLoadLoco);
router.get('/getAllLocoAssignedHistory', LocomotiveController.getAllLocoAssignedHistory);

router.patch('/patchSch', LocomotiveController.patchSch);
router.patch('/patchLoadLoco', LocomotiveController.patchLoadLoco);

router.post('/saveMileage', LocomotiveController.saveMileage);
router.get('/getAllMileage', LocomotiveController.getAllMileage);
router.get('/getAcceptedMileage', LocomotiveController.getAcceptedMileage);
router.get('/getOneMileage/:mReportNumber', LocomotiveController.getOneMileage);
router.get('/getOneMileageById/:id', LocomotiveController.getOneMileageById);
router.post('/sendMileEmail', LocomotiveController.sendMileEmail);
router.post('/sendLocoEmail', LocomotiveController.sendLocoEmail);
router.post('/sendAcceptedEmail', LocomotiveController.sendAcceptedEmail);
router.post('/sendRejectedEmail', LocomotiveController.sendRejectedEmail);

router.patch('/patch-mile/:id', LocomotiveController.patchMileController);
router.patch('/reject-mile/:id/:reason', LocomotiveController.rejectMileController);
router.patch('/patchFinalMile', LocomotiveController.patchFinalMile);
router.put('/patchSchMileage', LocomotiveController.patchSchMileage);

//locohistr
router.post('/saveLocoHistory', LocomotiveController.saveLocoHistory);
router.get('/getAllHistoryLoco/:locoNumber', LocomotiveController.getAllHistoryLoco);
router.get('/getOneLocoHistory/:id', LocomotiveController.getOneLocoHistory);

module.exports = router;