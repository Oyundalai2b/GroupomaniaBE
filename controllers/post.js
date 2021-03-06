const dotenv = require("dotenv");
dotenv.config();

const app = require("../app");
const db = require("../models");

const Post = db.posts;
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

// Create and Save a new Post
exports.createPost = (req, res, next) => {
  req.body.post.imgURL = null;

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    console.log(req.body);
    req.body.post = JSON.parse(req.body.post);

    req.body.post.imgURL = url + "/images/" + req.file.filename;
  }

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;

  const post = new Post({
    title: req.body.post.title,
    content: req.body.post.content,
    imgURL: req.body.post.imgURL,
    userId: userId,
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

exports.findAllPosts = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = parseInt(decodedToken.userId);

  Post.findAll({
    include: [{ model: User, attributes: ["name"], as: "user" }],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      posts.forEach((post) => {
        if (post.visited == null) {
          post.dataValues.isRead = false;
        } else if (!Object.values(post.visited).includes(userId)) {
          post.dataValues.isRead = false;
        } else {
          post.dataValues.isRead = true;
        }
        console.log(post);
      });
      res.send(posts);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Post with an id
exports.findOnePost = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id, {
    include: [{ model: User, attributes: ["name"], as: "user" }],
  })
    .then((data) => {
      if (data === null) {
        res.status(500).send({
          message: "Post is not found",
        });
      } else {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = parseInt(decodedToken.userId);

        if (data.visited == null) {
          data.visited = {};
          data.visited[userId] = userId;
          console.log("update visited posts first time");
        } else if (!Object.values(data.visited).includes(userId)) {
          data.visited[userId] = userId;

          console.log("update visited posts second time");
        }

        Post.update({ visited: data.visited }, { where: { id: id } })
          .then((num) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Post with id=" + id,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Post with id=" + id,
      });
    });
};

exports.update = (req, res, next) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = parseInt(decodedToken.userId);
  Post.findByPk(id)
    .then((data) => {
      if (userId == data.userId) {
        if (req.file) {
          const url = req.protocol + "://" + req.get("host");
          req.body.post = JSON.parse(req.body.post);
          req.body.post.imgURL = url + "/images/" + req.file.filename;
          console.log(req.body);
        }

        Post.update(req.body.post, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Post was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Post with id=" + id,
            });
          });
      } else {
        res.status(500).send({
          message: "You cannot modify someone's post",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Post with id=" + id,
      });
    });
};

// Delete a Post with the specified id in the request
exports.deletePost = (req, res) => {
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
