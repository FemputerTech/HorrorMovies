/** User data model schema */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, lowercase: true, trim: true, required: true },
  lastName: { type: String, lowercase: true, trim: true, required: true },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: { type: String, minLength: 6, required: true },
});

// Create and export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
