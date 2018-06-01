var express = require("express");
//const express = require('express')
var router = require("./routes/routes.js");
var path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");

// Bring in resources
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const tags = require("./routes/api/tags");
const colorSchemes = require("./routes/api/colorSchemes");
const profiles
 = require("./routes/api/profiles");
const songs = require("./routes/api/songs");
const mongoose = require("mongoose");

var app = express();
// Body parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Configuration
const DB = require("../config/keys").mongoURI;
// Connect to mongodb
mongoose
  .connect(DB)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//const app = expres();
//const port = process.env.PORT || 5000
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client"));
app.use(express.static(path.join(__dirname, "../client")));

app.use("/", router);

// Passport Middleware
app.use(passport.initialize());
// Passport Configuration
require("../config/passport")(passport);

// Use API routes - base URLs
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profiles", profiles);
app.use("/api/songs", songs);
app.use("/api/tags", tags);
app.use("/api/colorschemes", colorSchemes);

module.exports = app;
