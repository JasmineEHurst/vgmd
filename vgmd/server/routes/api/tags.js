// You have to bring in express to use the Router
const express = require("express")
const router = express.Router()
// For authentication
const passport = require("passport")

// Load the Tags model
const Tag = require("../../../models/Tag")
// Load the validation class
const validateTagInput = require("../../../validation/tag")

//@route  GET /api/tags/all
//@desc   Get all Tags
//@access Public
router.get("/", (req, res) => {
  const errors = {}
  Tag.find()
    .then(tags => {
      if (!tags) {
        errors.NoTagsFound = "There are no Tags."
        res.status(404).json(errors)
      } else {
        res.json(tags)
      }
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

//@route  GET /api/tags/{id}
//@desc   Get a Tag by its name
//@access Public
router.get("/:name", (req, res) => {
  const errors = {}
  Tag.findOne({ name: req.params.name })
    .then(tag => {
      if (!tag) {
        errors.TagNotFound = "There is no tag with this name."
        res.status(404).json(errors)
      } else {
        res.json(tag)
      }
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

//@route  POST /api/tags/
//@desc   Add new Tag
//@access Private r
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTagInput(req.body)
    // Check validations
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const tagFields = {}
    tagFields.name = req.body.name

    Tag.findOne({ name: req.body.name }).then(tag => {
      if (tag) {
        errors.TagAlreadyExists = "There is already a Tag with this name."
        res.status(400).json(errors)
      } else {
        // Save Tag
        new Tag(tagFields).save().then(tag => res.json(tag))
      }
    })
  }
)

//@route  DELETE /api/tags/:name
//@desc   Delete tag by name
//@access Private
router.delete(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tag.findOneAndRemove({ name: req.params.name }).then(() => {
      res.json({ success: true })
    })
  }
)

// Have to export module so server.js can pick it up
module.exports = router
