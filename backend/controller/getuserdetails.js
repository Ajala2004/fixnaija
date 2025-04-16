const express = require("express");
const User = require("../models/usermodel");

const router = express.Router();

// Middleware to fetch user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user; // Extract user ID from token

    // Fetch user details
    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



module.exports = getUserProfile;