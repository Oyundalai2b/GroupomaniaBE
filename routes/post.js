const posts = require("../controllers/post");

var router = require("express").Router();

// Create a new Post
router.post("/", posts.createPost);

//Create and Save new Comment
router.post("/:id/comments/", posts.createComment);

// Retrieve all posts
router.get("/", posts.findAll);

// Retrieve a single Post with id
router.get("/:id", posts.findOne);

//Get the comments for a given comment id
router.get("/comments/:id", posts.findCommentById);

// Update a Post with id
router.put("/:id", posts.update);

// Delete a Post with id
router.delete("/:id", posts.delete);

module.exports = router;
