import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const connectWithRetry = async (retries = 5, interval = 5000) => {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/RESERVATIONS";
  
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(MONGO_URI, {
        dbName: "RESERVATIONS",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      console.log("✅ Connected to MongoDB successfully!");
      return;
    } catch (err) {
      console.log(`❌ Attempt ${i + 1} of ${retries} failed:`);
      console.log(`Error: ${err.message}`);
      
      if (i < retries - 1) {
        console.log(`Retrying in ${interval/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }
  }
  throw new Error("Failed to connect to MongoDB after multiple attempts");
};

export const dbConnection = async () => {
  try {
    await connectWithRetry();

    // Set up connection event handlers
    mongoose.connection.on("connected", () => {
      console.log("🟢 Mongoose connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.log("🔴 Mongoose connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("🟡 Mongoose disconnected from MongoDB");
    });

    // Handle application termination
    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed through app termination");
        process.exit(0);
      } catch (err) {
        console.error("Error during MongoDB disconnect:", err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};