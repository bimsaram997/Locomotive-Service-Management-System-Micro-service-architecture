const express = require('express');

const CustomerController = require ('../controller/CustomerController');

const router = express.Router();

router.post('/saveCustomer', CustomerController.saveCustomer);
router.get('/getAllCustomers', CustomerController.getAllCustomers);
router.get('/getCustomer/:id', CustomerController.getCustomer);
router.get('/getAllCustomersSelect', CustomerController.getAllCustomersSelect);
router.delete('/deleteCustomer', CustomerController.deleteCustomer);
module.exports=router;
