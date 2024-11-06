/**
 * User Routes:
 * Entry points that specify how incoming requests related to user
 * accounts should be handled.
 */
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userMovieRoutes = require("./userMovieRoutes");

// User account management routes
router.get("/:userId", userController.getUser);
router.put("/:userId/update", userController.updateUser);
router.delete("/:userId/delete", userController.deleteUser);

// User Movie Route Handling
router.use("/:userId/movies", userMovieRoutes);

module.exports = router;
