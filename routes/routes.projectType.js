const express = require("express");
const projectType = express.Router();
const ProjectTypeController = require("../controllers/project_type.controller");

projectType
  .get("/", ProjectTypeController.getAll)
  .post("/create", ProjectTypeController.create)
  .put("/:id", ProjectTypeController.update)
  .delete("/:id", ProjectTypeController.delete);

module.exports = projectType;
