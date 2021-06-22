const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
// const dotenv = require("dotenv");

const app = express();

// dotenv.config();
// const MYSQL_URL =;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "groupomania",
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname.anchor, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoute);

module.exports = app;
