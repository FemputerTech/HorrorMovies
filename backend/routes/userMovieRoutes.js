/**
 * User Movie Routes:
 * Entry points that specify how incoming requests related to user
 * movies should be handled.
 */
const express = require("express");
const router = express.Router();
const userMovieController = require("../controllers/userMovieController");

// User account management routes
router.post("/", userMovieController.addMovie);
router.get("/:tmdbId", userMovieController.getMovie);
router.put("/update/:tmdbId", userMovieController.updateMovie);
router.delete("/delete/:tmdbId", userMovieController.deleteMovie);

module.exports = router;
