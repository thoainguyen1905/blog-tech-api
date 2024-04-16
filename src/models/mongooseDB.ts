const mongoose = require("mongoose");
import "dotenv/config";
const connectDB = async () => {
  const dbURI =
    "mongodb+srv://thoaikun1905:thoaikun1905@cluster0.ohsmtrq.mongodb.net/";
  mongoose.connect(process.env.mongooseDB, {});
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};

export default connectDB;
