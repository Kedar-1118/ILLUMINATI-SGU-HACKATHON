import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );

    console.log(`MongoDB connected!! DB Host: It's a secret!`);
  } catch (err) {
    console.error("Error: ", err);
    process.exit(1);
  }
};
