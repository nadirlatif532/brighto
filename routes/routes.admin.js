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
const OrderController = require("../controllers/order.controller");
const DealersController = require("../controllers/dealer.controller");
const LuxuryFinishController = require("../controllers/luxury_finishes.controller");
const UserController = require("../controllers/user.controller");
const ColorAdvisory = require("../controllers/coloradvisory.controller");
const { isAdmin } = require("../middlewares/auth.middleware");

admin
  .get("/user/specific", UserController.getSpecificUser)
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
  .post("/order/create", OrderController.createOrder)
  .post("/luxury-finish/create", LuxuryFinishController.create)
  .post("/dealer/create", DealersController.createDealer)
  .post("/color-advisory/create",ColorAdvisory.create)
  .put("/order/:id", OrderController.updateOrder)
  .put("/dealer/:id", DealersController.updateDealer)
  .put("/color-trends/:id", ColorTrendsController.update)
  .put("/project-type/:id", ProjectTypeController.update)
  .put("/category/:id", CategoryController.update)
  .put("/country/:id", CountryController.updateCountry)
  .put("/pallet/:id", PalletController.update)
  .put("/:id", ColorTrendsController.update)
  .put("/products/:id", ProductController.updateProduct)
  .put("/shades/:id", ShadesController.updateShade)
  .put("/family/:id", FamilyController.updateColor)
  .put("/finish-type/:id", FinishTypeController.update)
  .put("/surface/:id", SurfaceController.update)
  .put("/city/:id", CityController.updateCity)
  .put("/luxury-finish/:id", LuxuryFinishController.updateFinish)
  .put("/user/:id", isAdmin, UserController.updateUser)
  .put("/color-advisory/:id",ColorAdvisory.update)
  .put("/user/:id", isAdmin, UserController.deleteUser)
  .delete("/order/:id", OrderController.deleteOrder)
  .delete('/dealer/:id', DealersController.deleteDealer)
  .delete("/color-trends/:id", ColorTrendsController.delete)
  .delete("/category/:id", CategoryController.delete)
  .delete("/project-type/:id", ProjectTypeController.delete)
  .delete("/country/:id", CountryController.deleteCountry)
  .delete("/:id", ColorTrendsController.delete)
  .delete("/pallet/:id", PalletController.delete)
  .delete("/products/:id", ProductController.deleteProduct)
  .delete("/shades/:id", ShadesController.deleteShade)
  .delete("/family/:id", FamilyController.deleteColor)
  .delete("/finish-type/:id", FinishTypeController.delete)
  .delete("/surface/:id", SurfaceController.delete)
  .delete("/city/:id", CityController.deleteCity)
  .delete("/luxury-finish/:id", LuxuryFinishController.delete)
  .delete("/color-advisory/:id",ColorAdvisory.delete)
  
module.exports = admin;
