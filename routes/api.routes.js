import express from "express";

import handleError from "../middleware/handle-error.js";

import imageRequestService from "../services/imageRequest.service.js";

import fs from "fs";
import path from "path";

const router = express.Router();

// Image processing route
router.get("/process-image", async (req, res) => {
  try {
    // Assuming the URL is sent as a query parameter
    const imageRequest = await imageRequestService.create(req.query.url);
    res.set("Content-Type", "image/jpeg");

    res.send(imageRequest);
  } catch (error) {
    handleError(error, req, res);
  }
});

// health check routes
router.get("/status", (req, res) => {
  try {
    // get directory name
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    // Root directory
    const rootDir = path.resolve(__dirname, "../");

    const packagePath = path.join(rootDir, "package.json");
    const packages = JSON.parse(fs.readFileSync(packagePath, "utf-8"));

    res.json({ status: "API is running", packages });
  } catch (error) {
    handleError(error, req, res);
  }
});

export default router;
