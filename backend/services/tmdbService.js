/**
 * TMDB Service:
 * Manages interactions with the TMDB external API.
 * This service is responsible for retrieving and processing movie data
 * from TMDB, isolating this functionality from the controller.
 */
const axios = require("axios");
const config = require("../config");

class TMDBService {
  constructor() {
    this.baseURL = "https://api.themoviedb.org/3/";
    this.headers = {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbBearerToken}`,
    };
  }

  async fetchMovieDetails(movieId) {
    try {
      const response = await axios.get(`${this.baseURL}/movie/${movieId}`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch movie details from TMDB");
    }
  }

  async discoverMovies({ genres, keywords, page }) {
    try {
      const response = await axios.get(`${this.baseURL}/discover/movie`, {
        params: {
          include_adult: true,
          include_video: false,
          language: "en-US",
          sort_by: "vote_count.desc",
          with_genres: genres,
          with_keywords: keywords,
          page,
        },
        headers: this.headers,
      });
      return response.data.results;
    } catch (error) {
      throw new Error("Failed to discover movies from TMDB");
    }
  }
}

module.exports = new TMDBService();
