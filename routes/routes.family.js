const express = require("express");
const family = express.Router();
const FamilyController = require("../controllers/family.controller");

family
  .get("/", FamilyController.getAllColors)
  .get("/:color_id", FamilyController.getColorDetails)
  .get("/:color_id/:shade_id", FamilyController.getShadeDetails);

module.exports = family;
