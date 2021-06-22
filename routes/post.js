const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, postCtrl.createPost);
router.put("/:id", auth, postCtrl.modifyingPost);
router.delete("/:id", auth, postCtrl.deletePost);

module.export = router;
