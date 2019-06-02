const express = require("express");
const order = express.Router();
const OrderController = require("../controllers/order.controller");

order
  .get("/", OrderController.getAllOrders)
  .post("/specific",OrderController.getSpecificOrder)
  .post("/specific/dealer",OrderController.getOrderByDealer)
  .post("/specific/user", OrderController.getOrderByUser)

module.exports = order;
