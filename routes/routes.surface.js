const express = require("express");
const surface = express.Router();
const surfaceController = require("../controllers/surface.controller");

surface
  .get("/", surfaceController.getAll)
  .post("/create", surfaceController.create)
  .put("/:id", surfaceController.update)
  .delete("/:id", surfaceController.delete);

module.exports = surface;
