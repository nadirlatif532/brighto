const express = require("express");
const pallet = express.Router();
const PalletController = require("../controllers/pallet.controller");

pallet
  .get('/',PalletController.getAll)
  .post("/create",PalletController.create)
  .post("/specific/shade",PalletController.getPalleteByShadeId)

module.exports = pallet;
