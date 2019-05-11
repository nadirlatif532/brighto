const express = require("express");
const family = express.Router();
const FamilyController = require("../controllers/family.controller");

family
  .get("/", FamilyController.getAllColors)
  .get("/:color", FamilyController.getColorDetails)
  .get("/:color/:shade", FamilyController.getShadeDetails);

module.exports = family;
