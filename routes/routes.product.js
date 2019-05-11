const express = require("express");
const product = express.Router();
const ProductController = require("../controllers/product.controller");

product
  .get("/", ProductController.getAllProducts)
  .get("/:product_id", ProductController.getSpecificProduct)

module.exports = product;
