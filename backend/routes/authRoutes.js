/**
 * Auth Routes:
 * Entry points that specify how incoming requests related to authentication
 * should be handled. Each route corresponds to a specific endpoint
 * (e.g., GET /auth) and maps to an action in the Auth Controller.
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

/**
 * Route to signup.
 * @route POST /signup
 * @param {object} user - The user details for signup.
 * @returns {object} The response containing the created user as JSON.
 * @throws {Error} Throws an error if the user could not be registered.
 */
router.post("/signup", controller.signup);

/**
 * Route to login.
 * @route POST /login
 * @param {object} user - The username and password to login.
 * @returns {object} The response containing the user and token as JSON.
 * @throws {Error} Throws an error if the user could not be logged in.
 */
router.post("/login", controller.login);

/**
 * Route to logout.
 * @route POST /logout
 * @param {object} user - The username or user ID to logout.
 * @returns {object} A confirmation message as JSON.
 * @throws {Error} Throws an error if the user could not be logged out.
 */
router.post("/logout", controller.logout);

module.exports = router;
