
const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employees.controller');
const { route } = require('./employees.routes');

router.get('/employees', EmployeeController.getAll);
router.get('/employees/random', EmployeeController.getRandom);
router.get('/employees/:id', EmployeeController.getById);
router.post('/employees', EmployeeController.postAll);
router.put('employees/:id', EmployeeController.updateById);
router.delete('employees/:id', EmployeeController.deleteById);
