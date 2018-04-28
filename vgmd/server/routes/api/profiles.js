// You have to bring in express to use the Router
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
// const keys = require("");
// Load validation
const validateProfileInput = require("../../../validation/profile");
// Load models
const Profile = require("../../../models/Profile");
const User = require("../../../models/User");

//@route  GET /api/profiles
//@desc   Get current user profile
//@access Private. Passport makes the route protected
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = " There is no profile for the user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => status(404).json(err));
  }
);

//@route  GET /api/profiles/handle/:handle
//@desc   Get a user profile by their handle
//@access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => res.status(404).json(err));
});

//@route  GET /api/profiles/user/:user_id
//@desc   Get a user profile by their user id
//@access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//@route  GET /api/profiles/all
//@desc   Get all profiles
//@access Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ profile: "There are no profiles" });
    });
});

//@route  POST /api/profiles
//@desc   Create or edit user profile
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check validations
    if (!isValid) {
      // Return any errors with 400 Status
      return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }
    if (req.body.company) {
      profileFields.company = req.body.company;
    }
    if (req.body.website) {
      profileFields.website = req.body.website;
    }
    if (req.body.location) {
      profileFields.location = req.body.location;
    }
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }
    if (req.body.status) {
      profileFields.status = req.body.status;
    }
    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername;
    }
    // Skills - split into an array. It comes in as a CSV
    if (typeof req.body.skills != undefined) {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube;
    }
    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter;
    }
    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook;
    }
    if (req.body.instagram) {
      profileFields.social.instagram = req.body.instagram;
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        // Create
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          //Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// Have to export module so server.js can pick it up
module.exports = router;
