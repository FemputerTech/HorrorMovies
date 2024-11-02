/**
 * Movie Controller:
 * Directs movie-related requests to the corresponding actions.
 * This is where we handle the requests, process input data, and
 * manage the flow of data. It acts as a mediator between the view
 * (or client) and the model. Inside the controller, we call one
 * or more service classes for core logic and data processing.
 */
const movieService = require("../services/movieService");
const tmdbService = require("../services/tmdbService");
const { subgenres } = require("../services/constants");

class MovieController {
  async getMovieDetails(req, res) {
    const { movieId } = req.params;

    // Input validation
    if (!movieId || isNaN(movieId)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    try {
      const details = await tmdbService.fetchMovieDetails(movieId);
      res.json(details);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      // More specific error handling
      if (error.response?.status === 404) {
        return res.status(404).json({ error: "Movie not found" });
      }
      res.status(500).json({ error: "Failed to fetch movie details" });
    }
  }

  async getMoviesBySubgenre(req, res) {
    const { subgenre } = req.params;
    const { pages = 2 } = req.query;

    // Input validation
    const subgenreId = subgenres[subgenre.toLowerCase()];
    if (!subgenreId) {
      return res.status(400).json({ error: "Invalid subgenre" });
    }

    try {
      const movies = await movieService.getMoviesByKeyword(
        subgenreId,
        Number(pages)
      );
      res.json({
        data: movies,
        total: movies.length,
        pages: Number(pages),
      });
    } catch (error) {
      console.error("Error getting movies by subgenre:", error);
      res.status(500).json({ error: "Failed to fetch movies by subgenre" });
    }
  }
}

module.exports = new MovieController();
