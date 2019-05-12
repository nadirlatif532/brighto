const express = require("express");
const category = express.Router();
const CategoryController = require("../controllers/category.controller");

category
  .get("/", CategoryController.getAll)
  .post("/create", CategoryController.create)
  .put("/:id", CategoryController.update)
  .delete("/:id", CategoryController.delete);

module.exports = category;
