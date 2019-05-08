const express = require("express");
const auth = express.Router();

/*
 * temporary route to check if the middleware
 * is correctly working or not.
 */

auth.get("/me", (req, res) => {
  res.send(req.user);
});

module.exports = auth;
