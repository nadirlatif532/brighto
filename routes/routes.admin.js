const express = require("express");
const admin = express.Router();
const FamilyController = require("../controllers/family.controller");
const ProductController = require("../controllers/product.controller");
const ShadesController = require("../controllers/shades.controller");
const SurfaceController = require("../controllers/surface.controller");
const PalletController = require('../controllers/pallet.controller');
const ColorTrendsController = require('../controllers/color_trends.controller');
const CountryController = require('../controllers/country.controller');
const CategoryController = require('../controllers/category.controller');
const ProjectTypeController = require('../controllers/project_type.controller');
const FinishTypeController = require('../controllers/finish_type.controller');
const CityController = require("../controllers/city.controller");

admin
  .post("/family/create", FamilyController.createColor)
  .post("/products/create", ProductController.createProduct)
  .post("/shades/create", ShadesController.createShade)
  .post("/color-trends/create", ColorTrendsController.create)
  .post("/country/create", CountryController.createCountry)
  .post("/category/create", CategoryController.create)
  .post("/project-type/create", ProjectTypeController.create)
  .post("/finish-type/create", FinishTypeController.create)
  .post("/surface/create", SurfaceController.create)
  .post("/city/create", CityController.createCity)
  .put("/project-type/:id", ProjectTypeController.update)
  .put("/category/:id", CategoryController.update)
  .put("/country/:id", CountryController.updateCountry)
  .put("/pallet/:id",PalletController.update)
  .put("/:id", ColorTrendsController.update)
  .put("/products/:id", ProductController.updateProduct)
  .put("/shades/:id", ShadesController.updateShade)
  .put("/family/:id", FamilyController.updateColor)
  .put("/finish-type/:id", FinishTypeController.update)
  .put("/surface/:id", SurfaceController.update)
  .put("/city/:id",CityController.updateCity)
  .delete("/category/:id", CategoryController.delete)
  .delete("/project-type/:id", ProjectTypeController.delete)
  .delete("/country/:id",CountryController.deleteCountry)
  .delete("/:id", ColorTrendsController.delete)
  .delete("/pallet/:id",PalletController.delete)
  .delete("/products/:id", ProductController.deleteProduct)
  .delete("/shades/:id", ShadesController.deleteShade)
  .delete("/family/:id", FamilyController.deleteColor)
  .delete("/finish-type/:id", FinishTypeController.delete)
  .delete("/surface/:id", SurfaceController.delete)
  .delete("/city/:id",CityController.deleteCity);

module.exports = admin;
