const express = require("express");
const luxury = express.Router();
const LuxuryShadeController = require("../controllers/luxuryshade.controller");

luxury
  .get("/", LuxuryShadeController.getAllShades)
  .post("/specific",LuxuryShadeController.getSpecificShade)

module.exports = luxury;
