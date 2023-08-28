import mongoose from "mongoose";

export class DatabaseConnection {
  constructor(databaseUrl, databaseName) {
    this.databaseUrl = databaseUrl;
    this.databaseName = databaseName;
  }

  async connect() {
    try {
      await mongoose.connect(this.databaseUrl, {
        dbName: this.databaseName,
      });

      console.log("Connected to database");
    } catch (err) {
      console.error("Failed to connect to database", err.message);
    }
  }
}
