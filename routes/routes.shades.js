const express = require("express");
const shade = express.Router();
const ShadesController = require("../controllers/shades.controller");

shade
    .post("/", ShadesController.getShades)

module.exports = shade;
