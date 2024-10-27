/** API routes for movies */
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Get the API key from the environment variables
const OMDB_API_KEY = process.env.OMDB_API_KEY;

movieURL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&`;
posterURL = `http://img.omdbapi.com/?apikey=${OMDB_API_KEY}&`;

// Route to get a movie by title
router.get("/movie/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const response = await axios.get(`${movieURL}t=${title}`);
    const movieData = response.data;

    if (movieData.Response === "True") {
      res.json(movieData);
    } else {
      res.status(404).json({ message: movieData.Error });
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Error fetching movie" });
  }
});

module.exports = router;
