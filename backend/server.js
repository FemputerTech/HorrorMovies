/** Main server */
// Load environment variables first
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
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
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Schedule job to update top 100 horror movies on the last day of each month at 11:59 PM
const job = schedule.scheduleJob("0 59 23 L * *", async () => {
  console.log("Starting the update of top 100 horror movies...");
  try {
    await storeTop100();
    console.log("Top 100 horror movies updated successfully.");
  } catch (error) {
    console.error("Error updating top 100 movies:", error);
  }
});

// Define the landing page route
app.get("/", async (req, res) => {
  try {
    const topMovies = await Movie.find().sort({ vote_count: -1 }).limit(100);
    res.json(topMovies);
  } catch (error) {
    console.error("Error fetching top horror movies:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/movies", movieRoutes);
// app.use("/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`It's aliiiiiiiive! Running on http://localhost:${PORT}`);
});
