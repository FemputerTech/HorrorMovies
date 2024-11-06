/**
 * Movie Routes:
 * Entry points that specify how incoming requests related to movies
 * should be handled.
 */
const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/:tmdbId", movieController.getMovieDetails);
router.get("/subgenre/:subgenre", movieController.getMoviesBySubgenre);

module.exports = router;
