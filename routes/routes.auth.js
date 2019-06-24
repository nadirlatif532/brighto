const express = require("express");
const auth = express.Router();
const OrderController = require("../controllers/order.controller");
const UserController = require("../controllers/user.controller");

auth.use("/favourite", require("./routes.favourite"));
auth.get("/order/specific/user", OrderController.getOrderByUser);
auth.put("/user/:id", UserController.updateUser)

module.exports = auth;
