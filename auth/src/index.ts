import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined!");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDb");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => console.log(`Auth service listen on port 3000...`));
};

start();
