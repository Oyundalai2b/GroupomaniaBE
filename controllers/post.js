const bodyParser = require("body-parser");
const app = require("../app");
const db = require("../models");
const { post } = require("../routes/post");
const Post = db.posts;
const Comment = db.comments;
const Op = db.Sequelize.Op;

// app.use(bodyParser.json());

// Create and Save a new Post
exports.createPost = (req, res, next) => {
  const post = new Post({
    title: req.body.post.title,
    content: req.body.post.content,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//Create and Save new Comment
exports.createComment = (postId, comment) => {
  return Comment.create({
    userName: comment.userName,
    text: comment.text,
    postId: postId,
  })
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while creating comment: ", err);
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Post.findAll({ include: ["comments"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

//retrieve all comments from  a post
exports.findComments = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id, { include: ["comments"] })
    .then((data) => {
      if (data === null) {
        res.status(500).send({
          message: "Post is not found",
        });
      } else {
        if (data.comments === null) {
          console.log("doesnt have comments");
          res.send({
            message: "Post does not have any comments",
          });
        } else {
          res.send(data.comments);
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id,
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then((data) => {
      if (data === null) {
        res.status(500).send({
          message: "Post is not found",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id,
      });
    });
};

//Get the comments for a given comment id
exports.findCommentById = (req, res) => {
  const id = req.params.id;
  Comment.findByPk(id, { include: ["post"] })
    .then((comment) => {
      res.send(comment);
    })
    .catch((err) => {
      res.status(500).send({
        message: ">> Error while finding comment:" + id,
      });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Post.update(req.body.post, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id,
      });
    });
};
