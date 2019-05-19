const express = require("express");
const country = express.Router();
const CountryController = require("../controllers/country.controller");

country
  .get("/", CountryController.getAllCountries)

module.exports = country;
