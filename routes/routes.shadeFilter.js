const express = require("express");
const shadeFilter = express.Router();
const ShadeFilterController = require("../controllers/shadefilter.controller");

shadeFilter
  .get("/", ShadeFilterController.ShadeFilter)

module.exports = shadeFilter;
