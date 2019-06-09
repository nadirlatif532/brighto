const express = require("express");
const product = express.Router();
const ShadesController = require("../controllers/shades.controller");

product
  .post("/id", ShadesController.getShadeById )
  .post("/code", ShadesController.getShadeByCode);

module.exports = product;
