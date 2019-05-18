const express = require("express");
const pallet = express.Router();
const PalletController = require("../controllers/pallet.controller");

pallet
  .get('/',PalletController.getAll)

module.exports = pallet;
