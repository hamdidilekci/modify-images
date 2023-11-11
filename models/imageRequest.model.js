import { model, Schema } from "mongoose";

// ImageRequest Schema
const ImageRequestSchema = new Schema(
  {
    url: String,
    timestamp: { type: Date, default: Date.now() },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
    versionKey: false,
    collection: "imageRequest",
  }
);

const Model = model("ImageRequest", ImageRequestSchema);

export default Model;
