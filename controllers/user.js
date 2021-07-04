const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require("email-validator");
const db = require("../models");
const User = db.users;

const saltRounds = 10;

exports.signup = (req, res, next) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt).then((hash) => {
      if (!validator.validate(req.body.email)) {
        return res.status(500).json({
          error: "Enter valid email!",
        });
      }
      const user = new User({
        email: req.body.email,
        password: hash,
        userName: req.body.UserName,
        bio: req.body.bio,
      });
      user
        .save()
        .then(() => {
          res.status(201).json({
            message: "User added successfully!",
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    });
  });
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password!"),
            });
          }
          const token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          // console.log(user);
          res.status(200).json({
            userId: user.id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.getProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = parseInt(decodedToken.userId);
  User.findByPk(userId)
    .then((loggedinUser) => {
      res.send(loggedinUser);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot find profile",
      });
    });
};

exports.updateProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = parseInt(decodedToken.userId);
  User.findByPk(userId)
    .then((loggedinUser) => {
      User.update(req.body, {
        where: { id: userId },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Profile updated successfully",
            });
          } else {
            res.send({
              message: "Unsuccessful update request",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error!!",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "error!!",
      });
    });
};

exports.changePassword = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = parseInt(decodedToken.userId);

  User.findByPk(userId)
    .then((loggedinUser) => {
      bcrypt
        .compare(req.body.password, loggedinUser.password)
        .then((valid) => {
          if (valid) {
            if (req.body.newPassword === req.body.confirmPassword) {
              bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.newPassword, salt).then((newHash) => {
                  User.update({ password: newHash }, { where: { id: userId } })
                    .then((num) => {
                      if (num == 1) {
                        res.send({
                          message: "Password changed successfully.",
                        });
                      } else {
                        res.send({
                          message: "Cannot update password",
                        });
                      }
                    })
                    .catch((err) => {
                      res.status(500).send({
                        message: "Error on change password!!",
                      });
                    });
                });
              });
            } else {
              res.status(500).json({
                message: "Your new passwords do not match!",
              });
            }
          } else {
            res.status(500).json({
              message: "Your current password is incorrect",
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "error!!",
      });
    });
};

exports.deleteProfile = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = parseInt(decodedToken.userId);

  User.destroy({
    where: { id: userId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Profile was deleted successfully!",
        });
      } else {
        res.send({
          message: "Cannot delete Profile",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Profile",
      });
    });
};
