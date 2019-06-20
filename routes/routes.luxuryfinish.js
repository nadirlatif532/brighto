const express = require("express");
const luxury = express.Router();
const LuxuryFinishesController = require("../controllers/luxury_finishes.controller");

luxury
  .get("/", LuxuryFinishesController.getAllFinishes)
  .post("/specific",LuxuryFinishesController.getSpecificFinish)

module.exports = luxury;
