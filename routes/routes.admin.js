const express = require("express");
const admin = express.Router();
const FamilyController = require("../controllers/family.controller");
const ProductController = require("../controllers/product.controller");

admin
  .post("/family/create", FamilyController.createColor)
  .put("/family/:id", FamilyController.updateColor)
  .delete("/family/:id", FamilyController.deleteColor)
  .post("/create", ProductController.createProduct)
  .put("/:id", ProductController.updateProduct)
  .delete("/:id", ProductController.deleteProduct);

module.exports = admin;