/**
 * User Movie Controller:
 * Directs user-movie-related requests to the corresponding actions.
 * This is where we handle the requests, process input data, and
 * manage the flow of data. It acts as a mediator between the view
 * (or client) and the model.
 */
const { UserMovie } = require("../models/userModel");

class UserMovieController {
  async getMovies(req, res) {
    const { userId } = req.params;
    try {
      // Query all movies where userId matches the provided userId
      const movies = await UserMovie.find({ userId });

      // If no movies are found, send an empty array or a message
      // if (!movies.length) {
      //   return res
      //     .status(404)
      //     .json({ message: "No movies found for this user" });
      // }

      // Send the movies back in the response
      return res.status(200).json({ movies });
    } catch (error) {
      console.error("Error fetching movies:", error);
      return res
        .status(500)
        .json({ message: "Server error while fetching movies" });
    }
  }

  async addMovie(req, res) {
    const { userId } = req.params;
    const movieData = { ...req.body, userId };

    if (movieData.status === "") {
      movieData.status = undefined;
    }

    try {
      // Check if movie already exists
      const existingMovie = await UserMovie.findOne({
        userId: movieData.userId,
        tmdbId: movieData.tmdbId,
      });
      if (existingMovie) {
        console.log("need to update movie");
        return;
      }

      const newMovie = new UserMovie(movieData);
      const savedMovie = await newMovie.save();

      // Send success response
      return res
        .status(201)
        .json({ savedMovie, message: "Movie save successful" });
    } catch (error) {
      console.error("Error during movie save:", error);
      return res
        .status(500)
        .json({ message: "Server error during movie save" });
    }
  }

  async updateMovie(req, res) {
    console.log("updating movie...");
  }

  async deleteMovie(req, res) {
    console.log("deleting movie...");
  }
}

module.exports = new UserMovieController();
