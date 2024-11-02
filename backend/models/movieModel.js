/**
 * Movie Model:
 * Defines the data structure for movies, representing movie-related
 * data in the application. It interacts with the database and
 * includes validation logic, as well as defining relationships
 * between different data entities.
 */
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  date: { type: Date, required: true },
  runtime: { type: String },
  description: { type: String, required: true },
  language: { type: String, required: true },
  rating: { type: String },
  vote_count: { type: Number },
  tmdb_id: { type: Number, required: true },
  horror_archive_id: { type: String },
  imdb_id: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the model
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
