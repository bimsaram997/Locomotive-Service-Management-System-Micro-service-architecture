const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();
router.post('/signUp', UserController.register);
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getMangers', UserController.getManagers);
router.get('/loginUser', UserController.loginUser);
router.get('/getUser/:id', UserController.getUser)
router.post('/sendMails', UserController.sendMails);
router.post('/requestPassword', UserController.requestPassword);
router.post('/newPassword', UserController.newPassword);
router.post('/sendPassEmail', UserController.sendPassEmail);
router.get('/getUsers', UserController.getAllUserNew);
router.delete('/deleteUser', UserController.deleteUser);
router.put('/updateUser', UserController.updateUser);
router.get('/getOneUser/:userNic', UserController.getOneUser);
router.get('/getOneMan/:managerName', UserController.getOneMan);
router.get('/getOneSup/:supervisorName', UserController.getOneSup);
module.exports = router;