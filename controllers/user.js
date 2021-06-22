const bcrypt = require("bcrypt");
const jwt = requirer("jsonwebtoken");
const validator = require("email-validator");

const User = require("../models/user");

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
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
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
  User.findOne({ email: req.body.email })
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
          const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          res.status(200).json({
            userId: user._id,
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
