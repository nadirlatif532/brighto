const express = require("express");
const family = express.Router();
const FamilyController = require("../controllers/family.controller");

family
  .get("/", FamilyController.getAllColors)
  // .get("/specific/details", FamilyController.getShadeDetails)

module.exports = family;
