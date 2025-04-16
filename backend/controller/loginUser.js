const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login User controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token (even if the profile is incomplete)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY, // Secret key from environment variables
      { expiresIn: '1h' } // Token expiration time
    );

    // Token options
    const tokenOptions = {
      httpOnly: true,  // Cookie can't be accessed from JavaScript
      secure: process.env.NODE_ENV === 'production',  // Only use secure cookies in production
    };

    // Set the token in a cookie
    res.cookie('token', token, tokenOptions);

    // If profile is incomplete, prompt for profile completion but still return the token
    if (!user.isProfileComplete) {
      return res.status(200).json({
        message: 'Profile incomplete. Please complete your profile.',
        redirectTo: '/complete-profile',
        token, // Send the token with the response
      });
    }

    // Respond with success message
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  } 
};

module.exports = loginUser;  