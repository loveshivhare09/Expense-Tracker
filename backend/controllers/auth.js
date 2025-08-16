const User = require("../models/UserModel");
const bcrypt = require("bcrypt"); // Use bcryptjs (it's more popular in Node.js projects)
const jwt = require("jsonwebtoken");

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with a salt rounds of 10

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store hashed password
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error); // More detailed logging
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Signin Controller
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token (use secret from environment variable)
    const token = jwt.sign({ id: user._id },"Y2FwaGExMjM0NTY3ODlhY3J0YW5qb2xzZDQwMjU2cGlqNnZ3Y3Y=", { expiresIn: "1h" });

    // Send back the token and user info
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error during signin:", error); // More detailed logging
    res.status(500).json({ message: "Error signing in", error });
  }
};
