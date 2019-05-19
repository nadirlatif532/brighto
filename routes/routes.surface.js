const express = require("express");
const surface = express.Router();
const surfaceController = require("../controllers/surface.controller");

surface
  .get("/", surfaceController.getAll)

module.exports = surface;
