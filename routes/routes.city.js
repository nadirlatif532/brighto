const express = require("express");
const city = express.Router();
const CityController = require("../controllers/city.controller");

city
  .get("/", CityController.getAllCities)

module.exports = city;
