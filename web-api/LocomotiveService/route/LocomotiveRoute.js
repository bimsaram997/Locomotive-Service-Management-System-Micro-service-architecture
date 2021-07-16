const express = require('express');
const LocomotiveController = require('../controller/LocomotiveController');

const router = express.Router();

router.get('/getAllLocomotives', LocomotiveController.getAllLocomotives);
router.get('/getAllLocosSelect', LocomotiveController.getAllLocosSelect);
router.delete('/deleteLoco', LocomotiveController.deleteLoco);
router.put('/updateLocomotive', LocomotiveController.updateLocomotive);
router.post('/save-locomotive', LocomotiveController.saveReactiveLoco);
router.get('/getOneLoco/:id', LocomotiveController.getOneLoco);
router.get('/getLocoReport', LocomotiveController.getLocoReport);
router.get('/getOneLocoNew/:mLocoNumber', LocomotiveController.getOneLocoNew);
router.post('/sendLocoStatus', LocomotiveController.sendLocoStatus);
router.post('/sendStatusEmail', LocomotiveController.sendPassEmail);
router.get('/getlocoSche/:id', LocomotiveController.getLocoSch);
router.get('/getAllLocoAssigned', LocomotiveController.getAllLocoAssigned);
router.patch('/patchLocoSchedule/:locoNumber', LocomotiveController.patchLocoSchedule);
router.patch('/patchSch', LocomotiveController.patchSch);
router.patch('/patchLoadLoco', LocomotiveController.patchLoadLoco);

router.post('/saveMileage', LocomotiveController.saveMileage);
router.get('/getAllMileage', LocomotiveController.getAllMileage);
router.get('/getAcceptedMileage', LocomotiveController.getAcceptedMileage);
router.get('/getOneMileage/:mReportNumber', LocomotiveController.getOneMileage);
router.patch('/patch-mile/:id', LocomotiveController.patchMileController);
router.patch('/reject-mile/:id/:reason', LocomotiveController.rejectMileController);
router.patch('/patchFinalMile', LocomotiveController.patchFinalMile);
router.patch('/patchSchMileage', LocomotiveController.patchSchMileage);
module.exports = router;