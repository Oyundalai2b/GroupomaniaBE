const Post = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  req.body.post = JSON.parse(req.body.post);
  const post = new Post({
    userId: req.body.post.userId,
    post_title: req.body.post.post_title,
    post_content: req.body.post_content,
    post_image: req.body.post_image,
    post_date: req.body.post_date,
    post_time: req.body.post_time,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post save successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOnePost = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyingPost = (req, res, next) => {
  let post = new Post({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.post = JSON.parse(req.body.post);
    post = {
      _id: req.params.id,
      userId: req.body.post.userId,
      post_title: req.body.post.post_title,
      post_content: req.body.post_content,
      imageUrl: url + "/images/" + req.file.filename,
      post_date: req.body.post_date,
      post_time: req.body.post_time,
    };
  } else {
    post = {
      _id: req.params.id,
      userId: req.body.post.userId,
      post_title: req.body.post.post_title,
      post_content: req.body.post_content,
      post_date: req.body.post_date,
      post_time: req.body.post_time,
    };
  }

  Post.updateOne({ _id: req.params.id }, post)
    .then(() => {
      res.status(201).json({
        message: "Post updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    const filename = post.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Post.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Post deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
};

exports.getAllSauce = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
