const express = require("express");
const surface = express.Router();
const surfaceController = require("../controllers/surface.controller");

surface
  .get("/", surfaceController.getAll)
  .post("/specific",surfaceController.getSpecificSurface)

module.exports = surface;
