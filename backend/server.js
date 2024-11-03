/**
 * Main server
 */
const express = require("express");
const cors = require("cors");
const config = require("./config");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");

// Initialize web app with express API framework
const app = express();
const PORT = config.port;

// Middleware to configure the web API's security
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://horrormovies-754209826365.us-west1.run.app",
    ],
  })
);
app.use(express.json());

// Connect to MongoDb
mongoose
  .connect(config.dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`It's aliiiiiiiive! Running on http://localhost:${PORT}`);
});
