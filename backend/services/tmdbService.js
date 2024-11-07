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

  /**
   * Fetch movie details by movie ID.
   * @param {number} movieId - The ID of the movie to retrieve.
   * @returns {object} The movie details as JSON.
   * @throws {Error} Throws an error if fetching fails.
   */
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

  /**
   * Discover movies based on specified filters.
   * @param {object} params - The parameters for discovering movies.
   * @param {string} params.genres - A comma-separated list of genre IDs.
   * @param {string} params.keywords - A comma-separated list of keyword IDs.
   * @param {number} params.page - The page number for pagination.
   * @returns {Array<object>} An array of discovered movies.
   * @throws {Error} Throws an error if fetching fails.
   */
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

  async fetchMovieSearch(query) {
    try {
      const response = await axios.get(`${this.baseURL}/search/keyword`, {
        params: {
          query: query,
        },
        headers: this.headers,
      });
      return response.data.results;
    } catch (error) {
      throw new Error("Failed to search movies from TMDB");
    }
  }
}

module.exports = new TMDBService();
