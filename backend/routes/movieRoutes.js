/**
 * Movie Routes:
 * Entry points that specify how incoming requests related to movies
 * should be handled. Each route corresponds to a specific endpoint
 * (e.g., GET /movies) and maps to an action in the Movie Controller.
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/movieController");

// Route to get a horror movie's details
router.get("/movie/:movieId", controller.getMovieDetails);

// Route to get a horror movie list by subgenre
router.get("/subgenre/:subgenre", controller.getMoviesBySubgenre);

module.exports = router;
