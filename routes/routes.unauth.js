const express = require("express");
const unauth = express.Router();
const AuthController = require("../controllers/auth.controller");

unauth
  .post("/signup", AuthController.signup)
  .post("/login", AuthController.login)
  .post("/forgot-password", AuthController.forgotPassword)
  .post("/reset-password/:token", AuthController.resetPassword);

unauth.use("/family", require("./routes.family"));
unauth.use("/products", require("./routes.product"));
unauth.use("/shades", require("./routes.shades"));
unauth.use("/pallet",require('./routes.pallet'));
unauth.use("/color-trends",require('./routes.colorTrend'));
module.exports = unauth;
