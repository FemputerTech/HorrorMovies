/**
 * User Routes:
 * Entry points that specify how incoming requests related to users
 * should be handled. Each route corresponds to a specific endpoint
 * (e.g., GET /users) and maps to an action in the User Controller.
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

/**
 * Route to create a new user.
 * @route POST /signup
 * @param {object} user - The user details to create.
 * @returns {object} The response containing the created user as JSON.
 * @throws {Error} Throws an error if the user could not be created.
 */
router.post("/signup", controller.createUser);

/**
 * Route to update user details.
 * @route PUT /update/:userId
 * @param {string} userId - The ID of the user to update.
 * @param {object} user - The updated user details.
 * @returns {object} The response containing the updated user as JSON.
 * @throws {Error} Throws an error if the user could not be updated.
 */
router.put("/update/:userId", controller.updateUser);

/**
 * Route to delete a user.
 * @route DELETE /delete/:userId
 * @param {string} userId - The ID of the user to delete.
 * @returns {object} A confirmation message as JSON.
 * @throws {Error} Throws an error if the user could not be deleted.
 */
router.delete("/delete/:userId", controller.deleteUser);

/**
 * Route to find a user.
 * @route GET /find/:userId
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {object} The response containing the user details as JSON.
 * @throws {Error} Throws an error if the user is not found.
 */
router.get("/find/:userId", controller.findUser);

module.exports = router;
