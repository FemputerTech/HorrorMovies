/**
 * User Service:
 * Handles core logic related to user data processing and
 * interactions with the database. It abstracts the complexities
 * of data handling from the controller, allowing for cleaner
 * and more maintainable code.
 */
const User = require("../models/userModel");

class UserService {
  /**
   * Create a new user
   * @param {Object} userData - User data including email and password
   * @returns {Object} The created user document
   * @throws {Error} Throws an error if the user creation fails.
   */
  async createUser(userData) {
    const { email } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create a new user instance
    const newUser = new User(userData);

    // Save the user to the database
    try {
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new Error("User creation failed: " + error.message);
    }
  }

  async updateUser(userId, userData) {
    console.log("updating user...");
  }

  async deleteUser(userId) {
    console.log("deleting user...");
  }

  async findUserByEmail(email) {
    return await User.findOne({ email }); // Method to find a user by email
  }
}

module.exports = new UserService();
