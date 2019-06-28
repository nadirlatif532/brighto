const express = require("express");
const packaging = express.Router();
const PackagingController = require("../controllers/packaging.controller");

packaging
  .get("/", PackagingController.getAll)
  .post('/specific', PackagingController.getSpecificPackaging)

module.exports = packaging;


/*
  2. Create and Update all controllers.
  4. Create pallet
*/