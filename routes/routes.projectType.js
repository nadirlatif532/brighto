const express = require("express");
const projectType = express.Router();
const ProjectTypeController = require("../controllers/project_type.controller");

projectType
  .get("/", ProjectTypeController.getAll)

module.exports = projectType;
