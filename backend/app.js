const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db"); // Updated database connection
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000; // Use .env PORT, default to 5000

// Middleware
app.use(express.json()); // To parse JSON payloads
app.use(cors()); // Enable cross-origin requests

// Dynamic route loading
readdirSync("./routes").forEach((routeFile) => {
  app.use("/api/v1", require(`./routes/${routeFile}`));
});

// Start the server
const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1); // Terminate if server can't start
  }
};

startServer();
