import axios from "axios";
import sharp from "sharp";

import imageRequest from "../models/imageRequest.model.js";

export default class imageRequestService {
  static async create(imageUrl) {
    console.log("processing image", imageUrl);
    // Save the request to the database
    const newImageRequest = new imageRequest({ url: imageUrl });
    await newImageRequest.save();

    // Download and process the image
    const imageBuffer = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const processedImage = await sharp(imageBuffer.data)
      .greyscale()
      .resize(200, 200)
      .toBuffer();

    return processedImage;
  }
}
