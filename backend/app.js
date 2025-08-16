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
  app.use("/api", require(`./routes/${routeFile}`));
});

// Connect to the database for serverless deployment
connectDB();

module.exports = app;
    await connectDB();
