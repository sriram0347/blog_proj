const Post = require( '../models/posts'); // Import Post model
const User = require( '../models/User'); // Import User model
const jwt= require("jsonwebtoken");

const getPosts = async (req, res) => {
  try {
    let posts;
    if (req.query.cat) {
      // Find posts with the specified category
      posts = await Post.find({ cat: req.query.cat });
    } else {
      // Find all posts
      posts = await Post.find({});
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};
const getPostsByUser = async (req, res) => {
  try {
    const userId = req.cookies.user_id; // Assuming the user ID is stored in a cookie named 'id'

    if (!userId) {
      return res.status(400).json("User ID not found in cookies");
    }

    // Find posts by user ID
    const posts = await Post.find({ user_id: userId });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.aggregate([
      { $match: { _id: postId } },
      {
        $lookup: {
          from: User.collection.name,
          localField: 'userId', // Field in the Post model
          foreignField: '_id', // Field in the User model
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          id: '$_id',
          username: '$user.username',
          title: 1,
          desc: 1,
          img: 1,
          userImg: '$user.img',
          cat: 1,
          date: 1
        }
      }
    ]);

    if (!post) {
      return res.status(404).json('Post not found');
    }

    res.status(200).json(post[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addPost = async (req, res) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return res.status(401).json("Not authenticated!");
  
    try {
      const userInfo = jwt.verify(token, "asGafgdaf12d"); // Replace "jwtkey" with your actual JWT secret
      console.log(userInfo);  
      const newPost = new Post({
        title: req.body.title,
        desc: req.body.desc,
        
        cat: req.body.cat,
        date: req.body.date,
        user_id: userInfo.id, // Assuming the decoded token contains the user ID
      });
  
      await newPost.save();
      return res.json("Post has been created.");
    } catch (err) {
      
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json("Token is not valid!");
      }
      return res.status(500).json(err);
    }
  };

const deletePost = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    try {
      const userInfo = jwt.verify(token, "jwtkey"); // Replace "jwtkey" with your actual JWT secret
      const postId = req.params.id;
  
      const post = await Post.findOneAndDelete({ _id: postId, userId: userInfo.id });
      if (!post) {
        return res.status(403).json("You can delete only your post!");
      }
  
      return res.json("Post has been deleted!");
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json("Token is not valid!");
      }
      return res.status(500).json(err);
    }
  };

const updatePost = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    try {
      const userInfo = jwt.verify(token, "jwtkey"); // Replace "jwtkey" with your actual JWT secret
      const postId = req.params.id;
  
      // Update the post if the user is the owner
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, userId: userInfo.id }, // Ensure the user owns the post
        {
          title: req.body.title,
          desc: req.body.desc,
          img: req.body.img,
          cat: req.body.cat
        },
        { new: true } // Returns the updated document
      );
  
      if (!updatedPost) {
        return res.status(403).json("You can update only your post!");
      }
  
      return res.json("Post has been updated.");
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json("Token is not valid!");
      }
      return res.status(500).json(err);
    }
  };

  module.exports = { getPosts, getPost,addPost,deletePost,updatePost,getPostsByUser };