/**
 * Auth Controller:
 * Directs authentication related requests to the corresponding actions.
 * This is where we handle the requests, process input data, and
 * manage the flow of data. It acts as a mediator between the view
 * (or client) and the model. Inside the controller, we call one
 * or more service classes for core logic and data processing.
 */
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class AuthController {
  async signup(req, res) {
    const userData = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUserData = { ...userData, password: hashedPassword };

      // Create a new user instance
      const newUser = new User(newUserData);
      const savedUser = await newUser.save();

      // Send success response
      return res.status(201).json({ savedUser, message: "Signup successful" });
    } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).json({ message: "Server error during signup" });
    }
  }

  async login(req, res) {
    const userData = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email: userData.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(userData.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Send success response
      return res.status(200).json({ user, message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Server error during login" });
    }
  }

  async logout(req, res) {
    // will implement this later
    return res.status(200).json({ message: "Logout successful" });
  }
}

module.exports = new AuthController();
