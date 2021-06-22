const express = require("express");
const bodyParser = require("body-parser");
// const dotenv = require("dotenv");

const app = express();

// dotenv.config();
// const MYSQL_URL =;

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname.anchor, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoute);

module.exports = app;
