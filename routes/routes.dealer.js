const express = require("express");
const dealer = express.Router();
const DealersController = require("../controllers/dealer.controller");

dealer
  .get("/", DealersController.getAllDealers)
  .post("/specific", DealersController.getSpecificDealer)
  .post("/country", DealersController.getCountryDealers)
  .post("/city", DealersController.getCityDealers)

module.exports = dealer;
