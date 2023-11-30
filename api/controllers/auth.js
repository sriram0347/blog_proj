const bcrypt = require('bcryptjs');
const User =require( '../models/User'); // Import your User model
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingUser) {
      return res.status(409).json("User already exists!");
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user in the database
    await newUser.save();

    res.status(200).json({body:{message:"User has been created.",username:newUser.username,userId:newUser._id}});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
    try {
      // Check for user
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).json("User not found!");
      }
  
      // Check password
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
  
      if (!isPasswordCorrect) {
        return res.status(400).json("Wrong username or password!");
      }
  
      // Generate token
      const token = jwt.sign({ id: user._id }, "asGafgdaf12d"); // Use your secret key
  
      // Destructure to omit password from the response
      const { password, ...otherDetails } = user._doc;
  
      // Send response with token in a cookie
      res.cookie("access_token", token, {
        httpOnly: true,
        }).cookie("user_id", user._id.toString(), {
        httpOnly: true
        }).status(200).json(otherDetails);
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  const logout = (req, res) => {
    res.clearCookie("access_token", {
      sameSite: "none",
      secure: true
    }).status(200).json("User has been logged out.");
  };
  module.exports = {register,login,logout};