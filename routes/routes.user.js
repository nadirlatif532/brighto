const express = require("express");
const user = express.Router();
const UsersController = require("../controllers/user.controller");

user
    .get("/", UsersController.getUsers)

module.exports = user;
