const express = require("express");
const product = express.Router();
const ProductController = require("../controllers/product.controller");

product
  .post("/id", ProductController.getSpecificProduct)
  .post("/country",ProductController.getProductByCountry);

module.exports = product;
