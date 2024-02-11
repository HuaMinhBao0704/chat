const User = require("../models/user.model");

// TODO: implement user for sidebar
async function getUsersForSidebar(req, res) {
  try {
    const loggedInUserId = req.user._id;

    // Get all users except the logged in user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password');

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log('Error in getUsersForSidebar: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getUsersForSidebar };
