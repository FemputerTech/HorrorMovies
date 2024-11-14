// redisClient.js
const redis = require("redis");

// Configure Redis client
const redisUrl = process.env.REDIS_URL;
const redisClient = redis.createClient({ url: redisUrl });

// Connect to Redis
redisClient.connect().catch((err) => {
  console.error("Failed to connect to Redis:", err);
});

module.exports = redisClient;
