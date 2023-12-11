const User = require('../models/User'); // Import your User model
const jwt= require("jsonwebtoken");


const UserController = {
  // Get User Profile
  async getUserProfile(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).select('-password'); // Exclude password from the result
      if (!user) {
        return res.status(404).json("User not found.");
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Update User Profile
  async updateUserProfile(req, res) {
    try {
      const userId = req.params.userId;
      const updates = req.body;

      const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
      if (!user) {
        return res.status(404).json("User not found.");
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Delete User
  async deleteUser(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json("User not found.");
      }

      res.status(200).json("User deleted successfully.");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Additional user-related functionalities can be added here...

};
module.exports = UserController;

