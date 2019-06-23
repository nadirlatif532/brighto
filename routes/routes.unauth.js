const express = require("express");
const unauth = express.Router();
const AuthController = require("../controllers/auth.controller");

unauth
  .post("/signup", AuthController.signup)
  .post("/login", AuthController.login)
  .post("/forgot-password", AuthController.forgotPassword)
  .post("/reset-password/:token", AuthController.resetPassword)

unauth.use("/family", require("./routes.family"));
unauth.use("/products", require("./routes.products"));
unauth.use("/product", require("./routes.product"));
unauth.use("/shades", require("./routes.shades"));
unauth.use("/shade", require("./routes.shade"));
unauth.use("/pallet", require("./routes.pallet"));
unauth.use("/color-trends", require("./routes.colorTrend"));
unauth.use("/city", require("./routes.city"));
unauth.use("/country", require("./routes.country"));
unauth.use("/category", require("./routes.category"));
unauth.use("/project-type", require("./routes.projectType"));
unauth.use("/surface", require("./routes.surface"));
unauth.use("/finish-type", require("./routes.finishType"));
unauth.use("/dealer", require("./routes.dealer"));
unauth.use("/order", require("./routes.order"));
unauth.use("/user",require("./routes.user"));
unauth.use("/luxury-finish",require("./routes.luxuryfinish"));
unauth.use("/luxury-shade",require("./routes.luxuryshade"));
unauth.use("/color-advisory",require("./routes.colorAdvisory"));


module.exports = unauth;
