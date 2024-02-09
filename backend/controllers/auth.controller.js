const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const generateTokenAndSetCookie = require('../utils/generateToken');

// implement the sign up function
async function signUp(req, res) {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // check if password and confirm password are the same or not, if not return an error
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Password did not match' });
    }

    // Check if the username already exists in the database, if yes, return an error
    const existedUser = await User.findOne({ username });
    if (existedUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const SALT_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate the profile picture
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Initialize a new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate a JWT token for the new user
      generateTokenAndSetCookie(newUser._id, res);

      // Save the new user to the database
      await newUser.save();

      // Return the new user's information
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.log('Error in signUp function: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// implement the sign in function
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Check if the username exists in the database, if not, return an error
    const user = await User.findOne({ username });

    // Compare password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    );

    // If the user exists and the password is correct, generate a JWT token and set it as a cookie
    if (user && isPasswordCorrect) {
      generateTokenAndSetCookie(user._id, res);
    }

    // Return the user's information
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log('Error in login function: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// implement the sign out function
async function logout(req, res) {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Export the functions
module.exports = { signUp, login, logout };
