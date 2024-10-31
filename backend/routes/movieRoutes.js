/** API routes for movies */
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { fetchMovieDetails } = require("../services/movieService");

// Get the API key from the environment variables
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

// Map of genres
const genres = {
  horror: 27,
  mystery: 9648,
  scifi: 878,
  thriller: 53,
};

// Map of all the subgenre keywords
const subgenreMap = {
  "analog-horror": 319324,
  "body-horror": 283085,
  "creature-feature": 158126,
  "folk-horror": 178856,
  "found-footage": 163053,
  "horror-comedy": 224636,
  giallo: 272242,
  gothic: 33505,
  occult: 156174,
  paranormal: 9853,
  psychological: 295907,
  slasher: 12339,
  supernatural: 6152,
  "survival-horror": 50009,
  vampire: 3133,
  werewolf: 12564,
  zombie: 12377,
};

// Map of all horror mood keywords
const moodMap = {
  creepy: 210458,
  mystery: 316332,
  nostalgia: 5609,
  ghost: 162846,
  witch: 616,
  dreamlike: 232997,
  ominous: 325839,
  macabre: 162810,
  halloween: 3335,
};

// Route to get a horror movie's details
router.get("/movie/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const details = await fetchMovieDetails(movieId);
    res.json(details);
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
});

// Route to get a horror movie list by subgenre
router.get("/subgenre/:subgenre", async (req, res) => {
  const subgenre = req.params.subgenre.toLowerCase();
  const subgenreId = subgenreMap[subgenre];
  let movies = [];

  if (!subgenreId) {
    return res.status(400).json({ error: "Subgenre not found" });
  }
  for (let page = 1; page <= 2; page++) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            include_adult: true,
            include_video: false,
            language: "en-US",
            sort_by: "vote_count.desc",
            with_genres: 27,
            with_keywords: subgenreId,
            page: 1,
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
          },
        }
      );

      const movieIds = response.data.results
        .filter((movie) => movie.poster_path)
        .map((movie) => movie.id);

      // Fetch details for each movie concurrently
      const movieDetailsPromises = movieIds.map((id) => fetchMovieDetails(id));
      const movieDetails = await Promise.all(movieDetailsPromises);

      // Map the details to a simplified structure
      movies = movieDetails.map((detail) => ({
        id: detail.id,
        title: detail.title,
        poster_path: detail.poster_path,
        backdrop_path: detail.backdrop_path,
        overview: detail.overview,
        language: detail.original_language,
        popularity: detail.popularity,
        release_data: detail.release_date,
        runtime: detail.runtime,
      }));
      return res.json(movies);
    } catch (error) {
      console.error(error);
    }
  }
});

module.exports = router;
