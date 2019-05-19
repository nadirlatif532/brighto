const express = require("express");
const finishType = express.Router();
const FinishTypeController = require("../controllers/finish_type.controller");

finishType
  .get("/", FinishTypeController.getAll)

module.exports = finishType;
