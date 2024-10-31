/** Main server */
// Load environment variables first
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const config = require("./config");
const { storeTop100 } = require("./services/movieService");

const app = express();
const PORT = config.port || process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://horrormovies-frontend-754209826365.us-west1.run.app",
    ],
  })
);

// Connect to MongoDb
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.get("/", (req, res) => {
  res.send("Welcome to my horror movie recommendation site");
});

app.use("/movies", movieRoutes);
// app.use("/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`It's aliiiiiiiive! Running on http://localhost:${PORT}`);
});
