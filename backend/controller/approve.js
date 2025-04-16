const express = require("express");
const router = express.Router();
const User = require("../models/usermodel");

// Approve User Route
const approve = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { approved: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found.", error: true });
    }

    res.json({ message: "User approved successfully!", success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: true });
  }
};

module.exports = approve;