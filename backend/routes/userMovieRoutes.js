/**
 * User Movie Routes:
 * Entry points that specify how incoming requests related to user
 * movies should be handled.
 */
const express = require("express");
const router = express.Router({ mergeParams: true });
const userMovieController = require("../controllers/userMovieController");

// User account management routes
router.get("/", userMovieController.getMovies);
router.post("/add", userMovieController.addMovie);
router.put("/:tmdbId/update", userMovieController.updateMovie);
router.delete("/:tmdbId/delete", userMovieController.deleteMovie);

module.exports = router;
