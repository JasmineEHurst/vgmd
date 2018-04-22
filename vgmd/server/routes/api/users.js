// You have to bring in express to use the Router
const express = require("express");
const router = express.Router();
// Load User model
const User = require("../../../models/User");
const gravatar = require("gravatar");
// Bring in keys
const keys = require("../../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Bring in passport
const passport = require("passport");

//@route  GET /api/users/test
//@desc   Tests the users route
//@access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "User resource works"
  })
);

//@route  POST /api/users/register
//@desc   Register a user
//@access Public
router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200, // size
        r: "pg", // rating
        d: "mm" // default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route  POST /api/users/login
//@desc   Login user / Return the Json Web Token (JWT Token)
//@access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find the user by email by making use of Mongoose findOne function
  // findOne gives you a promise, which mean you use a .then()
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    // Check password. user.password will be the hashed password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User found, create JWT payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          //Callback
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({
          password: "Password incorrect"
        });
      }
    });
  });
});

//@route  GET /api/users/current
//@desc   Return current user
//@access Private. This is an example route and should not be used
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Send the user back, but not the password!
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// Have to export module so server.js can pick it up
module.exports = router;
