const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const Sequelize = require("sequelize");
// const dotenv = require("dotenv");

const app = express();

var connection = new Sequelize("groupomania", "root", "@Canberra888", {
  host: "localhost",
  dialect: "mysql",
});
// dotenv.config();
// var sequelize = new Sequelize(
//   "postgres://root:@Canberra888@localhost:3306/groupomania"
// );

app.use(bodyParser.json());

// app.use("/images", express.static(path.join(__dirname.anchor, "images")));

// app.use("/api/auth", userRoutes);
// app.use("/api/posts", postRoute);

module.exports = app;
