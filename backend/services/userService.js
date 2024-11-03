/**
 * User Service:
 * Handles core logic related to user data processing and
 * interactions with the database. It abstracts the complexities
 * of data handling from the controller, allowing for cleaner
 * and more maintainable code.
 */
const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class UserService {
  /**
   * Create a new user
   * @param {Object} userData - User data including email and password
   * @returns
   * @throws {Error} Throws an error if the user creation fails.
   */
  async createUser(userData) {
    const { email, password } = userData;
    console.log(email, password);
  }

  async updateUser(userId, userData) {
    console.log("updating user...");
  }

  async deleteUser(userId) {
    console.log("deleting user...");
  }

  async findUser(userId) {
    console.log("finding user...");
  }
}

module.exports = new UserService();
