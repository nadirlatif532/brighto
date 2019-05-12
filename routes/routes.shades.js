const express = require("express");
const shade = express.Router();
const ShadesController = require("../controllers/shades.controller");

shade
    .get("/", ShadesController.getShades)

module.exports = shade;
