const express = require('express');
const {
  addPost,
  deletePost,
  getPost,
  getPosts,
  getPostsByUser,
  updatePost,
} = require( "../controllers/post.js");

const router = express.Router();

router.get("/", getPosts);
router.get("/user",getPostsByUser);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

module.exports = router;