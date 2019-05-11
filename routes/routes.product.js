const express = require('express');
const product = express.Router();
const ProductController = require('../controllers/product.controller');

product
    .get('/',ProductController.getAllProducts)
    .get('/:product_id',ProductController.getSpecificProduct)
    .post('/create',ProductController.createProduct)
    .put('/:id',ProductController.updateProduct)
    .delete('/:id',ProductController.deleteProduct)

module.exports = product;
