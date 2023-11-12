import { RateLimiterMemory } from "rate-limiter-flexible";

// Initialize rate limiter
const opts = {
  points: 5, // 5 points
  duration: 60, // 1 minute in seconds
};

const rateLimiter = new RateLimiterMemory(opts);

// Express middleware for rate limiting
const rateLimitMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip, 1)
    .then(() => {
      // Successfully consumed points, continue with the request
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests"); // Handle rate limit exceeded
    });
};

export default rateLimitMiddleware;
