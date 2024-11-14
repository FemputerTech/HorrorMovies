/**
 * Configuration:
 * Loads environment variables.
 */
require("dotenv").config();

const config = {
  port: process.env.PORT || 5000,
  tmdbAPIKey: process.env.TMDB_API_KEY,
  tmdbBearerToken: process.env.TMDB_BEARER_TOKEN,
  dbURI: process.env.MONGODB_URI,
};

module.exports = config;