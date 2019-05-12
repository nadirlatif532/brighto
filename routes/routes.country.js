const express = require("express");
const country = express.Router();
const CountryController = require("../controllers/country.controller");

country
  .get("/", CountryController.getAllCountries)
  .post("/create", CountryController.createCountry)
  .put("/:id", CountryController.updateCountry)
  .delete("/:id",CountryController.deleteCountry)

module.exports = country;
