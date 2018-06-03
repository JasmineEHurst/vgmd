const express = require("express")
const router = express.Router()
const passport = require("passport")

// Load the Songs model
const Song = require("../../../models/Song")
// Load validator
const validateSongInput = require("../../../validation/song")
const validateTagInput = require("../../../validation/tag")

//@route  GET /api/songs/
//@desc   Get all songs
//@access Public
router.get("/", (req, res) => {
  const errors = {}
  Song.find()
    .then(songs => {
      if (!songs) {
        errors.nosongs = "There were no songs found."
        res.status(404).json(errors)
      }
      res.json(songs)
    })
    .catch(err => {
      res.status(404).json({ song: "There are no songs." })
    })
})

//@route  GET /api/songs/id
//@desc   Get song by ID
//@access Public
router.get("/:id", (req, res) => {
  const errors = {}
  Song.findById(req.params.id)
    .then(song => {
      if (!song) {
        errors.NoSongFound = "This song does not exist."
        res.status(404).json(errors)
      }
      res.json(song)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

//@route  POST /api/songs/
//@desc   Add a new song
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {errors, isValid} = validateSongInput(req.body)

    if(!isValid) {
      return res.status(400).json(errors)
    }
    const songFields = {}
    songFields.name = req.body.name
    songFields.youtube_link = req.body.youtube_link
    songFields.soundtrack = req.body.soundtrack
    songFields.composer = req.body.composer
    songFields.created = req.body.created
    songFields.tags = req.body.tags

    Song.findOne({ id: req.body.id }).then(song => {
      if (song) {
        //UPDATE
        Song.findOneAndUpdate(
          { id: req.body.id },
          { $set: songFields },
          { new: true }
        ).then(song => res.json(song))
      } else {
        //CREATE
        new Song(songFields).save().then(song => res.json(song))
      }
    })
  }
)

//@route  POST /api/songs/tag
//@desc   Add tag to song
//@access Private
// Validate if Tag exists

//@route  POST /api/songs/tag
//@desc   Add tag to song by name
//@access Private
router.post(
  ":songname/tag",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {errors, isValid} = validateTagInput(req.body)
    if(!isValid) {
      return res.status(400).json(errors)
    }
    // NEED TO ADD VALIDATION TO SEE IF TAG EXISTS AND IS ALREADY ON A SONG
    // NEED TO ADD TAG TO SONG BY NAME PARAMETER
    Song.findOne({ name: req.params.songname }).then(song => {
      const newTag = {
        name: req.body.name
      }
      //Add to the experience array of the user
      song.tags.unshift(newTag)
      song.save().then(song => res.json(song))
    })
  }
)

//@route  DELETE /api/songs/tag/:name
//@desc   Delete specific tag of song
//@access Private
router.delete(
  "/tag/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Song.findOne({ id: req.body.id }).then(song => {
      // Get remove index
      const removeIndex = song.tags
        .map(item => item.id)
        .indexOf(req.params.name)

      // Splice out of Array
      song.tags.splice(removeIndex, 1)

      // save
      song
        .save()
        .then(song => res.json(song))
        .catch(err => res.status(404).json(err))
    })
  }
)
//@route  DELETE /api/songs/tag/all
//@desc   Delete all tags of song
//@access Private
router.delete(
  "/tag/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Song.findOne({ id: req.body.id }).then(song => {
      // Get remove index
      const removeIndex = song.tags
        .map(item => item.id)
        .indexOf(req.params.name)

      // Splice out of Array
      song.tags.splice(removeIndex, 1)

      // save
      song
        .save()
        .then(song => res.json(song))
        .catch(err => res.status(404).json(err))
    })
  }
)
module.exports = router
