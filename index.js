import express from "express";

import "dotenv/config";

import connectDB from "./middleware/db.js";

import rateLimiter from "./middleware/rate-limiter.js";

import routes from "./routes/index.js";

// Connect to the database
connectDB();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiter to all routes
app.use(rateLimiter);

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
