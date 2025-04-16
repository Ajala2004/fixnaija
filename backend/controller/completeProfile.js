const express = require("express");
const multer = require("multer");
const s3 = require("../config/awsConfig"); // Your S3 config
const User = require("../models/usermodel"); // User model

const router = express.Router();

const completeProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token (Assuming user is authenticated)
    const { cacNumber, cacName, aboutMe, skill } = req.body; // Added aboutMe field

    // Validation
    if (!cacNumber || !cacName || !aboutMe || !req.files || !req.files.profilePicture || !req.files.drivingLicense) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Convert skill to lowercase
    const skillLowercase = skill.toLowerCase();

    // AWS S3 upload function
    const uploadToS3 = (file, folder) => {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME, // Ensure this environment variable is set
        Key: `${folder}/${userId}-${Date.now()}`, // Unique filename using userId and timestamp
        Body: file.buffer,
        ContentType: file.mimetype, // Ensures the content type is set correctly,
      };
      return s3.upload(params).promise(); // This returns a promise with the upload result
    };

    // Get the uploaded files
    const profilePictureFile = req.files.profilePicture[0]; // First file in profilePicture array
    const drivingLicenseFile = req.files.drivingLicense[0]; // First file in drivingLicense array

    // Upload the profile picture and driving license to S3
    const profilePictureUpload = await uploadToS3(profilePictureFile, "profile-pictures");
    const drivingLicenseUpload = await uploadToS3(drivingLicenseFile, "driving-licenses");

    // Update the user document with the S3 URLs, aboutMe field, and lowercase skill
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        cacRegistrationNumber: cacNumber,
        cacRegistrationName: cacName,
        profilePictureUrl: profilePictureUpload.Location, // URL from S3 upload
        drivingLicenseUrl: drivingLicenseUpload.Location, // URL from S3 upload
        aboutMe: aboutMe, // Save aboutMe field
        skill: skillLowercase, // Save skill in lowercase
        isProfileComplete: true, // Set isProfileComplete to true
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Profile updated successfully.", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = completeProfile;