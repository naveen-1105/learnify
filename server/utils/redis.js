import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 5, 
  connectTimeout: 10000,   
  tls: {},
});

redis.on("connect", () => {
  console.log("Redis connected");

  // Keep-alive mechanism to prevent Redis from being archived
  setInterval(() => {
    redis.ping().catch((err) => {
      console.error("Redis keep-alive error:", err);
    });
  }, 1000 * 60 * 15); // Ping every 15 minutes
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

