const express = require('express');
const UserController =require( '../controllers/user');

const router = express.Router();

// Route to get a user's profile
router.get('/profile/:userId', UserController.getUserProfile);

// Route to update a user's profile
router.put('/profile/:userId', UserController.updateUserProfile);

// Route to delete a user
router.delete('/delete/:userId', UserController.deleteUser);

// You can add more user-related routes here

module.exports = router;