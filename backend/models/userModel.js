/** User data model schema */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Create and export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
