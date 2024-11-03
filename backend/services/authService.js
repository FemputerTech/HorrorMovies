/**
 * Auth Service:
 * Handles core logic related to user data processing and
 * interactions with the database. It abstracts the complexities
 * of data handling from the controller, allowing for cleaner
 * and more maintainable code.
 */
const userService = require("./userService");
const bcrypt = require("bcrypt");

class AuthService {
  async signup(userData) {
    try {
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUserData = { ...userData, password: hashedPassword };

      // Create the user using the UserService
      return await userService.createUser(newUserData);
    } catch (error) {
      throw new Error("Failed to signup: " + error.message);
    }
  }

  async login(userData) {
    try {
      // Find the user by email
      const user = await userService.findUserByEmail(userData.email);
      if (!user) {
        throw new Error("User not found");
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(userData.password, user.password);
      if (!isMatch) {
        throw new Error("Invalid password");
      }

      // Return the user data (will add a token here)
      return user;
    } catch (error) {
      throw new Error("Failed to login: " + error.message);
    }
  }
}

module.exports = new AuthService();
