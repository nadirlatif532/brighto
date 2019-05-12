const express = require("express");
const admin = express.Router();
const FamilyController = require("../controllers/family.controller");
const ProductController = require("../controllers/product.controller");
const ShadesController = require("../controllers/shades.controller");

admin
  .post("/family/create", FamilyController.createColor)
  .post("/products/create", ProductController.createProduct)
  .post("/shades/create", ShadesController.createShade)
  .put("/products/:id", ProductController.updateProduct)
  .put("/shades/:id", ShadesController.updateShade)
  .put("/family/:id", FamilyController.updateColor)
  .delete("/products/:id", ProductController.deleteProduct)
  .delete("/shades/:id", ShadesController.deleteShade)
  .delete("/family/:id", FamilyController.deleteColor);

admin.use("/category", require("./routes.category"));

module.exports = admin;
