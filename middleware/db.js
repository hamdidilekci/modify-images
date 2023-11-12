// db.js
import mongoose from "mongoose";

mongoose.set("debug", true);

const connectDB = async () => {
  const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_URL } = process.env;
  const connectionString = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}`;

  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the Database!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;
