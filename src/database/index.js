import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });

    console.log("Connected to database");
  } catch (err) {
    console.error("Fail to connect to database", err.message);
  }
}
