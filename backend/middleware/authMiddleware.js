const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

// Middleware to check if the user is signed in
const requiredSignedin = async (req, res, next) => {
  try {
    // Ensure authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header is missing" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1], // Extract token after "Bearer"
      process.env.JWT_SECRET
    );

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in requiredSignedin middleware:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    // Ensure `req.user` is populated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User information missing" });
    }

    // Fetch the user from the database
    const User = await user.findById(req.user._id);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has admin role
    if (User.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized Access",
      });
    }

    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};

module.exports = { requiredSignedin, isAdmin };
