/** Main server */
// Load environment variables first
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const config = require("./config");

const app = express();
const PORT = config.port || process.env.PORT || 5000;

app.use("/movies", movieRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`It's aliiiiiiiive! Running on http://localhost:${PORT}`);
});
