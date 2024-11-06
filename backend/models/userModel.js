/** User data model schema */
const mongoose = require("mongoose");

const userMovieSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ["want to watch", "watched", "watching"],
    default: "want to watch",
  },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

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
  createdAt: { type: Date, default: Date.now },
});

// Create and export the model
const User = mongoose.model("User", userSchema);
const UserMovie = mongoose.model("UserMovie", userMovieSchema);

module.exports = { User, UserMovie };
