// You have to bring in express to use the Router
const express = require("express")
const router = express.Router()
// For authentication
const passport = require("passport")

// Load the Tags model
const Color_Scheme = require("../../../models/Color_Scheme")
// Load the validation class
const validateColorSchemeInput = require("../../../validation/colorScheme")

//@route  GET /api/colorschems/all
//@desc   Get all color schemes
//@access Public
router.get("/all", (req, res) => {
  const errors = {}
  Color_Scheme.find()
    .then(tags => {
      if (!tags) {
        errors.NoColorSchemesFound = "There are no color schemes."
        res.status(404).json(errors)
      } else {
        res.json(tags)
      }
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

//@route  GET /api/colorschemes/{name}
//@desc   Get a Tag by its name
//@access Public
router.get("/:name", (req, res) => {
  const errors = {}
  Color_Scheme.findOne({ name: req.params.name })
    .then(colorScheme => {
      if (!colorScheme) {
        errors.ColorSchemeNotFound = "There is no color scheme with this name."
        res.status(404).json(errors)
      } else {
        res.json(colorScheme)
      }
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

//@route  POST /api/colorschemes/
//@desc   Add new color scheme
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateColorSchemeInput(req.body)
    // Check validations
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const colorSchemeFields = {}
    colorSchemeFields.name = req.body.name
    colorSchemeFields.css_link = req.body.css_link
    colorSchemeFields.javascript_link = req.body.javascript_link

    Color_Scheme.findOne({ name: req.body.name }).then(colorScheme => {
      if (colorScheme) {
        //make this update instead of throw an error
        errors.ColorSchemeAlreadyExists = "There is already a color scheme with this name."
        res.status(400).json(errors)
      } else {
        // Save Tag
        new Color_Scheme(colorSchemeFields).save().then(colorScheme => res.json(colorScheme))
      }
    })
  }
)

//@route  DELETE /api/colorschemes/:name
//@desc   Delete color scheme by name
//@access Private
router.delete(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Color_Scheme.findOneAndRemove({ name: req.params.name }).then(() => {
      res.json({ success: true })
    })
  }
)

// Have to export module so server.js can pick it up
module.exports = router
