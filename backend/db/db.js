const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Disable strictQuery for flexibility
    mongoose.set("strictQuery", false);

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/expense_Tracker", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error.message);

    // Exit the process if the database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
