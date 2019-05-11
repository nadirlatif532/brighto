const express = require("express");
const auth = express.Router();
const FamilyController = require("../controllers/family.controller");

auth
  .post("/family/create", FamilyController.createColor)
  .put("/family/:id", FamilyController.updateColor)
  .delete("/family/:id", FamilyController.deleteColor);

module.exports = auth;