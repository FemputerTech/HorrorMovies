/**
 * Movie Service:
 * Handles core logic related to movie data processing and
 * interactions with the database. It abstracts the complexities
 * of data handling from the controller, allowing for cleaner
 * and more maintainable code.
 */
const tmdbService = require("./tmdbService");

class MovieService {
  constructor() {
    this.genres = {
      horror: 27,
      mystery: 9648,
      scifi: 878,
      thriller: 53,
    };
  }

  /**
   * Get movie details by movie ID.
   * @param {number} movieId - The ID of the movie to retrieve.
   * @returns {object} The movie details as JSON.
   * @throws {Error} Throws an error if the movie is not found or if fetching fails.
   */
  async getMovieDetails(movieId) {
    try {
      return await tmdbService.fetchMovieDetails(movieId);
    } catch (error) {
      throw new Error("Failed to fetch movie details");
    }
  }

  /**
   * Get movies by keyword and genre.
   * @param {string} keywords - The keywords to search for movies.
   * @param {number} pages - The number of pages of results to retrieve (default is 2).
   * @param {Array<number>} genreIds - An array of genre IDs to filter by (default is horror).
   * @returns {Array<object>} An array of movie details.
   * @throws {Error} Throws an error if an error occurs while fetching movies.
   */
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
        throw new Error("Failed to fetch movies by keyword");
      }
    }
    return movies;
  }

  /**
   * Formats the movie details.
   * @param {Array<object>} movies - The array of movies to format.
   * @returns {Array<object>} The formatted movie details.
   */
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

module.exports = new MovieService();
