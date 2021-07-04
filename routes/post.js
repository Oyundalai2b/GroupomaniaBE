const posts = require("../controllers/post");
const multer = require("../middleware/multer-config");

const router = require("express").Router();

// Create a new Post
router.post("/", multer, posts.createPost);

//Create and Save new Comment
router.post("/:id/comments", posts.createComment);

router.get("/:id/comments", posts.findComments);

// Retrieve all posts
router.get("/", posts.findAllPosts);

// Retrieve a single Post with id
router.get("/:id", posts.findOnePost);

// router.get("/:id/is-read", posts.isRead);

//Get the comments for a given comment id
router.get("/comments/:id", posts.findCommentById);

// Update a Post with id

router.put("/:id", multer, posts.update);

// Delete a Post with id
router.delete("/:id", posts.deletePost);

module.exports = router;
