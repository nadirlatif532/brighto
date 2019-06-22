const express = require("express");
const user = express.Router();
const UsersController = require("../controllers/user.controller");
const { isAdmin } = require("../middlewares/auth.middleware");
user
    .get("/", isAdmin, UsersController.getUsers)


module.exports = user;
