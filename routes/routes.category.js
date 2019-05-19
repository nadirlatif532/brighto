const express = require("express");
const category = express.Router();
const CategoryController = require("../controllers/category.controller");

category
  .get("/", CategoryController.getAll)

module.exports = category;
