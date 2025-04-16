const express = require("express");
const User = require("../models/usermodel"); 
const router = express.Router();

// Get Only Approved Users
const approvedUsers = async (req, res) => {
    try {
      // Fetch users with approved: true and userStatus: "service provider"
      const approvedUsers = await User.find({ approved: true, userStatus: "serviceprovider" });
  
      res.status(200).json({ 
        success: true,
        error: false,
        data: approvedUsers,
        message: "Approved users fetched successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: true,
        message: err.message || "Error fetching approved users",
      });
    }
  };

module.exports = approvedUsers ;