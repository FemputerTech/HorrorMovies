// redisClient.js
const redis = require("redis");

// Configure Redis client
// Use this for production
// const redisClient = redis.createClient({url: "https://horrormovies-754209826365.us-west1.run.app"});
const redisClient = redis.createClient();

// Connect to Redis
redisClient.connect().catch((err) => {
  console.error("Failed to connect to Redis:", err);
});

module.exports = redisClient;
