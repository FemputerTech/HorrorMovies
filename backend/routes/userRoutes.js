/**
 * User Routes:
 * Entry points that specify how incoming requests related to users
 * should be handled. Each route corresponds to a specific endpoint
 * (e.g., GET /users) and maps to an action in the User Controller.
 */
const express = require("express");
const userService = require("../services/userService");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Auth API" });
});

module.exports = router;
