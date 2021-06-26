const express = require("express"); //Express is for the framework building the Rest apis
const cors = require("cors"); //cors provides Express middleware to enable CORS with various options.

const app = express(); //create an Express app, then add body-parser (json and urlencoded) and cors middlewares using app.use() method.

const postRoute = require("./routes/post");
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const controller = require("./controllers/post");

db.sequelize.sync().then(() => {});

app.use("/api/posts", postRoute);

module.exports = app;
