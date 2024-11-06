/**
 * User Movie Controller:
 * Directs user-movie-related requests to the corresponding actions.
 * This is where we handle the requests, process input data, and
 * manage the flow of data. It acts as a mediator between the view
 * (or client) and the model.
 */
class UserMovieController {
  async addMovie(req, res) {
    console.log("adding movie...");
  }
  async getMovie(req, res) {
    console.log("getting movie...");
  }
  async updateMovie(req, res) {
    console.log("updating movie...");
  }
  async deleteMovie(req, res) {
    console.log("deleting movie...");
  }
}

module.exports = new UserMovieController();
