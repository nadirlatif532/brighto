const express = require("express");
const product = express.Router();
const ShadeController = require("../controllers/shades.controller");

product
  .post("/id", ShadeController.getShadeById )
  .post("/product",ShadeController.getShadeByProduct)
  .post("/code",ShadeController.getShadeByCode);

module.exports = product;
