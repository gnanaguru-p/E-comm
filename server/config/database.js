const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB connected: ${mongoose.connection.host}:${mongoose.connection.port}`
    );
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Optionally, implement retry logic or other error handling mechanisms here
    // For example, retry connection after a delay
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
    await connectDatabase(); // Retry connecting
  }

  // Event listeners for MongoDB connection events
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected. Reconnecting...");
    connectDatabase(); // Attempt to reconnect
  });

  // Close the Mongoose connection if the Node process ends
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("MongoDB connection disconnected through app termination");
      process.exit(0);
    });
  });
};

module.exports = connectDatabase;
