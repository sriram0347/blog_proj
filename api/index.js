
const express = require('express');
const authRoutes = require( "./routes/auth.js");
const userRoutes = require( "./routes/users.js");
const postRoutes = require( "./routes/posts.js");
const cookieParser = require("cookie-parser");
const multer = require( "multer");
const bcrypt = require('bcryptjs');


const app = express();

app.use(express.json()); 
app.use("/api/auth", authRoutes);
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  console.log(file);
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sriramtoram:HelloWorld1234@cluster0.nh99h3u.mongodb.net/')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const port = process.env.PORT || 8003;
app.listen(port, () => console.log(`Listening on port ${port}...`));