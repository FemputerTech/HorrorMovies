/** Movie services */
const Movie = require("../models/movieModel");
const axios = require("axios");

// Get the API key from the environment variables
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

// Function to fetch top 100 horror movies from TMDb API
async function fetchTop100() {
  const genreId = 27;
  const totalPages = 5;
  let topMovies = [];
  for (let page = 1; page <= totalPages; page++) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            include_adult: true,
            include_video: false,
            language: "en-US",
            sort_by: "vote_count.desc",
            with_genres: genreId,
            page,
          },
          headers: {
            Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
          },
        }
      );
      // Push the results to the topMovies array
      topMovies.push(...response.data.results);
    } catch (error) {
      console.log(error);
    }
  }
  return topMovies;
}

// Function to store fetched top 100 horror movies in the database
async function storeTop100() {
  const topMovies = await fetchTop100();
  for (const movie of topMovies) {
    const {
      id,
      title,
      release_date,
      original_language,
      vote_count,
      popularity,
      overview,
      poster_path,
      backdrop_path,
      genre_ids,
    } = movie;

    // Check if the movie already exists
    const existingMovie = await Movie.findOne({ id });
    if (!existingMovie) {
      // Create a new movie document
      const newMovie = new Movie({
        tmdb_id: id,
        title,
        release_date,
        original_language,
        vote_count,
        popularity,
        overview,
        poster_path,
        backdrop_path,
        genre_ids,
      });

      try {
        await newMovie.save();
      } catch (error) {
        console.error(`Error saving movie ${title}:`, error);
      }
    }
  }
  console.log("Top 100 horror movies stored in the database.");
}

module.exports = { fetchTop100, storeTop100 };