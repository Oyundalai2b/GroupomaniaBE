const posts = require("../controllers/post");
const multer = require("../middleware/multer-config");

const router = require("express").Router();

// Create a new Post
router.post("/", multer, posts.createPost);

// Retrieve all posts
router.get("/", posts.findAllPosts);

// Retrieve a single Post with id
router.get("/:id", posts.findOnePost);

// Update a Post with id

router.put("/:id", multer, posts.update);

// Delete a Post with id
router.delete("/:id", posts.deletePost);

module.exports = router;
