const User = require('../models/userModel');

// Update Profile
const updateProfile = async (req, res) => {
  const { email, cacRegistrationName, cacRegistrationNumber, profilePicture, drivingLicense, aboutMe } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        cacRegistrationName,
        cacRegistrationNumber,
        profilePicture,
        drivingLicense,
        aboutMe,
        isProfileComplete: true,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = updateProfile;