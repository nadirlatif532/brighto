const express = require("express");
const category = express.Router();
const CategoryController = require("../controllers/category.controller");

category
  .get("/", CategoryController.getAll)
  .post("/specific",CategoryController.getSpecificCategory)

module.exports = category;
