/**
 * Movie Routes:
 * Entry points that specify how incoming requests related to movies
 * should be handled. Each route corresponds to a specific endpoint
 * (e.g., GET /movies) and maps to an action in the Movie Controller.
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/movieController");

/**
 * Route to get details of a horror movie.
 * @route GET /movie/:movieId
 * @param {string} movieId - The ID of the movie to retrieve.
 * @returns {object} The response containing the movie details as JSON.
 * @throws {Error} Throws an error if the movie is not found.
 */
router.get("/movie/:movieId", controller.getMovieDetails);

/**
 * Route to get a list of a horror movies by subgenre.
 * @route GET /subgenre/:subgenre
 * @param {string} subgenre - The subgenre of the movies to retrieve.
 * @returns {object} The response containing the movie details as JSON.
 * @throws {Error} Throws an error if the subgenre is invalid or if no movies are found.
 */
router.get("/subgenre/:subgenre", controller.getMoviesBySubgenre);

module.exports = router;
