const express = require("express");
const shade = express.Router();
const ShadesController = require("../controllers/shades.controller");

shade
    .get("/", ShadesController.getShades)
    .post("/family", ShadesController.getColorDetails)
    .post("/product", ShadesController.getShadeByProduct)

module.exports = shade;
