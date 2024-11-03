/**
 * User Controller:
 * Directs user-related requests to the corresponding actions.
 * This is where we handle the requests, process input data, and
 * manage the flow of data. It acts as a mediator between the view
 * (or client) and the model. Inside the controller, we call one
 * or more service classes for core logic and data processing.
 */
const userService = require("../services/userService");
const validation = require("../utils/validation");
const { handleError } = require("../utils/errorHandler");

class UserController {
  /**
   * Create a new user.
   * @param {object} req - The request object containing user data.
   * @param {object} res - The response object.
   * @returns {object} The response containing the created user as JSON.
   */
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.json(user);
    } catch (error) {
      handleError(res, error, "Failed to create user");
    }
  }

  /**
   * Update user details.
   * @param {object} req - The request object containing user ID and updated data.
   * @param {object} res - The response object.
   * @returns {object} The response containing the updated user as JSON.
   */
  async updateUser(req, res) {
    const { userId } = req.params;
    try {
      const updatedUser = await userService.updateUser(userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      handleError(res, error, "Failed to update user");
    }
  }

  /**
   * Delete a user.
   * @param {object} req - The request object containing user ID.
   * @param {object} res - The response object.
   * @returns {object} A confirmation message as JSON.
   */
  async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      await userService.deleteUser(userId);
      res.send();
    } catch (error) {
      handleError(res, error, "Failed to delete user");
    }
  }

  /**
   * Find a user by ID.
   * @param {object} req - The request object containing user ID.
   * @param {object} res - The response object.
   * @returns {object} The response containing the user details as JSON.
   */
  async findUser(req, res) {
    const { userId } = req.params;
    try {
      const user = await userService.findUser(userId);
      res.json(user);
    } catch (error) {
      handleError(res, error, "User not found");
    }
  }
}

module.exports = new UserController();
