const express = require("express");
const auth = express.Router();
const OrderController = require("../controllers/order.controller");

auth.use("/favourite", require("./routes.favourite"));
auth.get("/order/specific/user", OrderController.getOrderByUser);

module.exports = auth;
