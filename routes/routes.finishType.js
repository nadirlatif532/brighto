const express = require("express");
const finishType = express.Router();
const FinishTypeController = require("../controllers/finish_type.controller");

finishType
  .get("/", FinishTypeController.getAll)
  .post("/create", FinishTypeController.create)
  .put("/:id", FinishTypeController.update)
  .delete("/:id", FinishTypeController.delete);

module.exports = finishType;
