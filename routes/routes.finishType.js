const express = require("express");
const finishType = express.Router();
const FinishTypeController = require("../controllers/finish_type.controller");

finishType
  .get("/", FinishTypeController.getAll)
  .post('/specific', FinishTypeController.getSpecificFinish)

module.exports = finishType;


/*
  2. Create and Update all controllers.
  4. Create pallet
  4. isAC and isRM confirmation
*/