/**
 * Auth Controller:
 * Directs authentication related requests to the corresponding actions.
 * This is where we handle the requests, process input data, and
 * manage the flow of data. It acts as a mediator between the view
 * (or client) and the model. Inside the controller, we call one
 * or more service classes for core logic and data processing.
 */
const authService = require("../services/authService");
const { handleError } = require("../utils/errorHandler");

class AuthController {
  async signup(req, res) {
    try {
      const user = await authService.signup(req.body);
      res.status(201).json({ user, message: "Signup successful" });
    } catch (error) {
      handleError(res, error, "Failed to signup");
    }
  }

  async login(req, res) {
    try {
      const user = await authService.login(req.body);
      res.status(200).json({ user, message: "Login successful" });
    } catch (error) {
      handleError(res, error, "Failed to login");
    }
  }

  async logout(req, res) {
    // will implement this later
    res.status(200).json({ message: "Logout successful" });
  }
}

module.exports = new AuthController();
