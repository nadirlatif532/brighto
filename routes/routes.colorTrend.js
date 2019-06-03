const express = require("express");
const colorTrends = express.Router();
const ColorTrendsController = require("../controllers/color_trends.controller");

colorTrends
  .get("/", ColorTrendsController.getAll)
  .post("/id",ColorTrendsController.getById);

module.exports = colorTrends;
