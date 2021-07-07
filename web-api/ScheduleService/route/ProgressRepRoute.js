const express = require('express');
const ProgressRepController = require('../controller/PogressRepController');
const router = express.Router();
router.post('/sendProReport', ProgressRepController.sendProReport);
router.post('/sendProEmail', ProgressRepController.sendProEmail);
router.post('/saveProgress', ProgressRepController.saveProgress);
router.get('/getAllProgress', ProgressRepController.getAllProgress);
router.get('/sendOneProgress/:id', ProgressRepController.sendOneProgress);
module.exports = router;