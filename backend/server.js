/** Main server */
const express = require("express");
const dotenv = require("dotenv");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const config = require("./config");

dotenv.config();

const app = express();
const PORT = config.port;

// Start the server
app.listen(PORT, () => {
  console.log(`It's aliiiiiiiive! Running on http://localhost:${PORT}`);
});
