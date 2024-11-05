/**
 * User Controller:
 * Directs user-related requests to the corresponding actions.
 * This is where we handle the requests, process input data, and
 * manage the flow of data. It acts as a mediator between the view
 * (or client) and the model.
 */
class UserController {
  async getUser(req, res) {
    console.log("getting user...");
  }
  async updateUser(req, res) {
    console.log("updating user...");
  }
  async deleteUser(req, res) {
    console.log("deleting user...");
  }
}

module.exports = new UserController();
