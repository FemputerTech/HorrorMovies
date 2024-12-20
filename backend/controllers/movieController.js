/**
 * Movie Controller:
 * Directs movie-related requests to the corresponding actions.
 * This is where we handle the requests, process input data, and
 * manage the flow of data. It acts as a mediator between the view
 * (or client) and the model. Inside the controller, we call the
 * TMDB service for core logic and data processing.
 */
const tmdbService = require("../services/tmdbService");
const validation = require("../utils/validation");
const redisClient = require("../config/redisClient");
const config = require("../config/config");

class MovieController {
  constructor() {
    this.genres = {
      horror: 27,
      mystery: 9648,
      scifi: 878,
      thriller: 53,
    };

    // Bind methods to the instance
    this.getMovieDetails = this.getMovieDetails.bind(this);
    this.getMoviesBySubgenre = this.getMoviesBySubgenre.bind(this);
    this.getMoviesByKeyword = this.getMoviesByKeyword.bind(this);
    this.searchMovies = this.searchMovies.bind(this);
  }

  async getMovieDetails(req, res) {
    const { tmdbId } = req.params;

    // Input validation
    if (!validation.validateMovieId(tmdbId)) {
      return res.status(400).json({ error: "Invalid tmdb ID" });
    }

    const cacheKey = `details-${tmdbId}`;

    try {
      if (config.environment === "development") {
        // Check for cached data
        const cacheData = await redisClient.get(cacheKey);
        if (cacheData) {
          console.log(`Returning cached data for ${cacheKey}`);
          return res.json(JSON.parse(cacheData));
        }
      }
      // Fetch details from TMDB service if no cached data
      const details = await tmdbService.fetchMovieDetails(tmdbId);
      if (config.environment === "development") {
        // Set cache data to Redis for 1 hour
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(details));
      }
      res.json(details);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return res
        .status(500)
        .json({ message: "Server error during movie details fetch" });
    }
  }

  async getMoviesBySubgenre(req, res) {
    const { subgenre } = req.params;
    const { pages = 2 } = req.query;

    // Input validation
    if (!validation.validateSubgenre(subgenre)) {
      return res.status(400).json({ error: "Invalid subgenre" });
    }
    if (isNaN(pages) || pages <= 0) {
      return res.status(400).json({ error: "Invalid pages parameter" });
    }

    const subgenreId = validation.subgenres[subgenre.toLowerCase()];
    const cacheKey = `subgenre-${subgenre}`;

    try {
      if (config.environment === "development") {
        // Check for cached data
        const cacheData = await redisClient.get(cacheKey);
        if (cacheData) {
          console.log(`Returning cached data for ${cacheKey}`);
          return res.json(JSON.parse(cacheData));
        }
      }
      // Fetch movies from TMDB service if no cached data
      const movies = await this.getMoviesByKeyword(subgenreId, Number(pages));
      if (config.environment === "development") {
        // Set cache data to Redis for 1 hour
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(movies));
      }
      res.json(movies);
    } catch (error) {
      console.error(`Error fetching movies with subgenre ${subgenre}:`, error);
      return res
        .status(500)
        .json({ message: "Server error during subgenre fetch" });
    }
  }

  async searchMovies(req, res) {
    const { input } = req.params;
    const genreIds = [this.genres.horror];
    const cacheKey = `query-${input}`;

    try {
      if (config.environment === "development") {
        // Check for cached data
        const cacheData = await redisClient.get(cacheKey);
        if (cacheData) {
          console.log(`Returning cached data for ${cacheKey}`);
          return res.json(JSON.parse(cacheData));
        }
      }
      // Fetch data from TMDB service if no cached data
      const results = await tmdbService.fetchMovieSearch(input);
      // Filter out movies without poster path and that are not in the horror genre
      const movieIds = results
        .filter(
          (movie) =>
            movie.poster_path &&
            movie.genre_ids.some((id) => genreIds.includes(id))
        )
        .map((movie) => movie.id);
      // Get the details of the movie
      const movieDetails = await Promise.all(
        movieIds.map((id) => tmdbService.fetchMovieDetails(id))
      );
      if (config.environment === "development") {
        // Set cache data to Redis for 1 hour
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(movieDetails));
      }
      res.json(movieDetails);
    } catch (error) {
      console.error("Error fetching movie search:", error);
      return res
        .status(500)
        .json({ message: "Server error during movie search fetch" });
    }
  }

  async getMoviesByKeyword(
    keywords,
    pages = 2,
    genreIds = [this.genres.horror]
  ) {
    const movies = [];
    for (let page = 1; page <= pages; page++) {
      try {
        const results = await tmdbService.discoverMovies({
          genres: genreIds.join(","),
          keywords: keywords,
          page,
        });

        // Filter out movies without poster path
        const movieIds = results
          .filter((movie) => movie.poster_path)
          .map((movie) => movie.id);

        // Get the details of the movie
        const movieDetails = await Promise.all(
          movieIds.map((id) => tmdbService.fetchMovieDetails(id))
        );
        movies.push(...movieDetails);
      } catch (error) {
        console.error(
          `Failed to fetch movies by keyword on page ${page}:`,
          error
        );
        throw new Error("Failed to fetch movies by keyword");
      }
    }
    return movies;
  }
}

module.exports = new MovieController();
