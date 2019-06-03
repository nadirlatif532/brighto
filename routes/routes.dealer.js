const express = require("express");
const dealer = express.Router();
const DealersController = require("../controllers/dealer.controller");

dealer
  .get("/", DealersController.getAllDealers)
  .post("/specific", DealersController.getSpecificDealer)
module.exports = dealer;
