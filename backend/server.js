/** Main server */
// Load environment variables first
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const config = require("./config");
const Movie = require("./models/movieModel");
const { storeTop100 } = require("./services/movieService");

const app = express();
const PORT = config.port || process.env.PORT || 5000;

// Connect to MongoDb
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then((result) => console.log("connected to db"))
  .catch((error) => console.log(error));

// Define the landing page route
app.get("/", async (req, res) => {
  try {
    const topMovies = await Movie.find().sort({ rating: -1 }).limit(100);
    res.json(topMovies);
  } catch (error) {
    console.error("Error fetching top horror movies:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/movies", movieRoutes);
// app.use("/users", userRoutes);

// Start the server
app.listen(PORT, async () => {
  console.log(`It's aliiiiiiiive! Running on http://localhost:${PORT}`);
  try {
    await storeTop100();
  } catch (error) {
    console.error("Error storing top 100 movies:", error);
  }
});
