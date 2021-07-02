const express = require("express"); //Express is for the framework building the Rest apis
const cors = require("cors"); //cors provides Express middleware to enable CORS with various options.
const path = require("path");

const app = express(); //create an Express app, then add body-parser (json and urlencoded) and cors middlewares using app.use() method.
const auth = require("./middleware/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const controller = require("./controllers/post");

db.sequelize.sync({ force: false }).then(() => {
  // console.log("Drop and re-sync db.");
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/posts", auth, postRoute);
app.use("/api/users", userRoute);

module.exports = app;
