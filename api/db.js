const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sriramtoram:HelloWorld1234@cluster0.nh99h3u.mongodb.net/')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));