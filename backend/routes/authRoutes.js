/**
 * Auth Routes:
 * Entry points that specify how incoming requests related to
 * authentication should be handled.
 */
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Authentication related routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
