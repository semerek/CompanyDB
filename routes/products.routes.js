
const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products.controller');
const { route } = require('./products.routes');

router.get('/products', ProductController.getAll);
router.get('/products/random', ProductController.getRandom);
router.get('/products/:id', ProductController.getById);
router.post('/products', ProductController.postAll);
router.put('products/:id', ProductController.updateById);
router.delete('products/:id', ProductController.deleteById);
