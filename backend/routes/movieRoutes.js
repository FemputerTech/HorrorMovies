/** API routes for movies */
// Horror is genre id: 27
// Thriller is genre id: 53
// Scifi is genre id: 878
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Get the API key from the environment variables
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

// Route to get a horror movie by title
router.get("/:title", async (req, res) => {
  const title = req.params.title;
  const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=true&language=en-US&page=1&with_genres=27%2C%2053%2C%20878`;

  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching top-rated horror movies:", error);
    res.status(500).json({ message: "Error fetching top-rated horror movies" });
  }
});

module.exports = router;
