const express = require("express");
const admin = express.Router();
const FamilyController = require("../controllers/family.controller");
const ProductController = require("../controllers/product.controller");
const ShadesController = require("../controllers/shades.controller");
const SurfaceController = require("../controllers/surface.controller");
const PalletController = require('../controllers/pallet.controller');
const ColorTrendsController = require('../controllers/color_trends.controller');

admin
  .post("/family/create", FamilyController.createColor)
  .post("/products/create", ProductController.createProduct)
  .post("/shades/create", ShadesController.createShade)
  .post("/pallet/create",PalletController.create)
  .post("/color-trends/create", ColorTrendsController.create)
  .put("/pallet/:id",PalletController.update)
  .put("/:id", ColorTrendsController.update)
  .put("/products/:id", ProductController.updateProduct)
  .put("/shades/:id", ShadesController.updateShade)
  .put("/family/:id", FamilyController.updateColor)
  .delete("/:id", ColorTrendsController.delete)
  .delete("/pallet/:id",PalletController.delete)
  .delete("/products/:id", ProductController.deleteProduct)
  .delete("/shades/:id", ShadesController.deleteShade)
  .delete("/family/:id", FamilyController.deleteColor);

admin.use("/country",require("./routes.country"));
admin.use("/category", require("./routes.category"));
admin.use("/project-type",require('./routes.projectType'));
admin.use('/surface',require('./routes.surface'));
admin.use('/finish-type',require("./routes.finishType"));

module.exports = admin;
