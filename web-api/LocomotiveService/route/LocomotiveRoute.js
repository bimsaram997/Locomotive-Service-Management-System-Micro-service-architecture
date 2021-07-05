const express = require('express');
const LocomotiveController = require('../controller/LocomotiveController');

const router = express.Router();
router.post('/saveLoco', LocomotiveController.saveLoco);
router.get('/getAllLocomotives', LocomotiveController.getAllLocomotives);
router.get('/getAllLocosSelect', LocomotiveController.getAllLocosSelect);
router.delete('/deleteLoco', LocomotiveController.deleteLoco);
router.put('/updateLocomotive', LocomotiveController.updateLocomotive);
router.get('/getInCount', LocomotiveController.getInCount);
router.get('/getOutCount', LocomotiveController.getOutCount);
router.post('/save-locomotive', LocomotiveController.saveReactiveLoco);
router.post('/saveMileage', LocomotiveController.saveMileage);
router.get('/getAllMileage', LocomotiveController.getAllMileage);
router.get('/getAcceptedMileage', LocomotiveController.getAcceptedMileage);
router.get('/getOneLoco/:id', LocomotiveController.getOneLoco);
router.get('/getOneMileage/:mReportNumber', LocomotiveController.getOneMileage);
router.patch('/patch-mile/:id', LocomotiveController.patchMileController);
router.patch('/reject-mile/:id/:reason', LocomotiveController.rejectMileController);
router.post('/sendLocoStatus', LocomotiveController.sendLocoStatus);
router.post('/sendStatusEmail', LocomotiveController.sendPassEmail);

router.get('/getlocoSche/:id', LocomotiveController.getLocoSch)
module.exports = router;