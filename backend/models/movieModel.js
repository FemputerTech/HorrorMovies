/** Movie data model schema */
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  tmdb_id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  release_date: { type: Date, required: true },
  original_language: { type: String },
  vote_count: { type: Number },
  popularity: { type: Number },
  overview: { type: String },
  poster_path: { type: String },
  backdrop_path: { type: String },
  genre_ids: [{ type: Number }],
  createdAt: { type: Date, default: Date.now },
});

// Create and export the model
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
