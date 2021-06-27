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
  console.log(req.body);
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
