const express = require("express");
const product = express.Router();
const ProductController = require("../controllers/product.controller");

product
  .post("/", ProductController.getAllProducts)
  .get("/:id", ProductController.getSpecificProduct)
  .get('/filter',ProductController.getFilteredProduct)

module.exports = product;
