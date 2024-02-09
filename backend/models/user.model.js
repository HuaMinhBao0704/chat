const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide your full name'],
    },
    username: {
      type: String,
      required: [true, 'Please provide your username'],
      unique: [true, 'Username already exists'],
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;