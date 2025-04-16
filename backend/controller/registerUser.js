const User = require('../models/usermodel');
const bcrypt = require('bcrypt');

// Register User
const registerUser = async (req, res) => {
  const { surname, lastName, state, lga, homeAddress, email, phoneNumber, password } = req.body;

  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert state to lowercase
    const stateLowercase = state.toLowerCase();

    // Create a new user
    const newUser = new User({
      surname,
      lastName,
      state: stateLowercase, // Save state in lowercase
      lga,
      homeAddress,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = registerUser;