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
  }

  async getMovieDetails(req, res) {
    const { movieId } = req.params;

    // Input validation
    if (!validation.validateMovieId(movieId)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    try {
      const details = await tmdbService.fetchMovieDetails(movieId);
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

    try {
      const movies = await this.getMoviesByKeyword(subgenreId, Number(pages));
      res.json(movies);
    } catch (error) {
      console.error(`Error fetching movies with subgenre ${subgenre}:`, error);
      return res
        .status(500)
        .json({ message: "Server error during subgenre fetch" });
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
        movies.push(...this.formatMovieDetails(movieDetails));
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

  formatMovieDetails(movies) {
    return movies.map(
      ({
        id,
        title,
        poster_path,
        backdrop_path,
        overview,
        tagline,
        original_language,
        popularity,
        release_date,
        runtime,
        vote_average,
      }) => ({
        id,
        title,
        poster_path,
        backdrop_path,
        overview,
        tagline,
        language: original_language,
        popularity,
        release_date,
        runtime,
        vote_average,
      })
    );
  }
}

module.exports = new MovieController();
