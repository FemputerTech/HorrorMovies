/**
 * Movie Controller:
 * Directs movie-related requests to the corresponding actions.
 * This is where we handle the requests, process input data, and
 * manage the flow of data. It acts as a mediator between the view
 * (or client) and the model. Inside the controller, we call the
 * TMDB service for core logic and data processing.
 */
const movieService = require("../services/movieService");
const validation = require("../utils/validation");
const { handleError } = require("../utils/errorHandler");

class MovieController {
  /**
   * Get horror movie details.
   * @param {object} req - The request object containing parameters and data from the client.
   * @param {object} res - The response object used to send data back to the client.
   * @returns {object} The response containing the movie details as JSON.
   * @throws {Error} Throws an error if the movie is not found.
   */
  async getMovieDetails(req, res) {
    const { movieId } = req.params;

    // Input validation
    if (!validation.validateMovieId(movieId)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    try {
      const details = await movieService.getMovieDetails(movieId);
      res.json(details);
    } catch (error) {
      handleError(res, error, "Failed to fetch movie details");
    }
  }
  /**
   * Get horror movies by subgenre.
   * @param {object} req - The request object containing parameters and data from the client.
   * @param {object} res - The response object used to send data back to the client.
   * @returns {object} The response containing the movie details as JSON.
   * @throws {Error} Throws an error if an error occurs while fetching movies.
   */
  async getMoviesBySubgenre(req, res) {
    const { subgenre } = req.params;
    const { pages = 2 } = req.query;

    // Input validation
    if (!validation.validateSubgenre(subgenre)) {
      return res.status(400).json({ error: "Invalid subgenre" });
    }

    const subgenreId = validation.subgenres[subgenre.toLowerCase()];

    try {
      const movies = await movieService.getMoviesByKeyword(
        subgenreId,
        Number(pages)
      );
      res.json(movies);
    } catch (error) {
      handleError(res, error, "Failed to fetch movies by subgenre");
    }
  }
}

module.exports = new MovieController();
