const express = require("express");
const User = require("../models/usermodel"); // Replace with your actual user model path
const router = express.Router();

// Unapprove User Route
const unapprove = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID and update the approved field to false
    const user = await User.findByIdAndUpdate(
      id,
      { approved: false },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "User unapproved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message || "Error unapproving user",
    });
  }
};

module.exports = unapprove;