import express from "express";

import rateLimit from "express-rate-limit";

import "dotenv/config";

import mongoose from "mongoose";
mongoose.set("debug", true);

import routes from "./routes/index.js";

const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_URL } = process.env;

const connectionString = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}`;

await mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the Database. Yayzow!");
  })
  .catch((err) => {
    console.log(err);
  });

// Define rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
});

// allow empty strings
mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Apply rate limiter to all routes
app.use(limiter);

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
