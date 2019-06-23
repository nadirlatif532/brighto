const express = require("express");
const colorAdvisory = express.Router();
const colorAdvisoryController = require("../controllers/coloradvisory.controller");

colorAdvisory
  .get("/", colorAdvisoryController.getAll)
  .post("/specific", colorAdvisoryController.getSpecificAdvisory)

module.exports = colorAdvisory;
