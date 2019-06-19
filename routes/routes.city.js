const express = require("express");
const city = express.Router();
const CityController = require("../controllers/city.controller");

city
  .get("/", CityController.getAllCities)
  .post("/specific", CityController.getCitiesByCountry)
  .post("/dealers", CityController.getCitiesWithDealers);

module.exports = city;
