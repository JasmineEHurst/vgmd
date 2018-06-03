// You have to bring in express to use the Router
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")
const Post = require("../../../models/Post")
const Profile = require("../../../models/Profile")
const validatePostInput = require("../../../validation/post");

//@route  GET /api/posts/:id
//@desc   Get all posts
//@access Public
router.get("/", (req, res) => {
  const errors = {}
  Post.find()
  .sort({date: -1})
    .then(post => {
      if (!post) {
        errors.nopost = "There are no posts."
        res.status(404).json(errors)
      }
      res.json(post)
    })
    .catch(err =>
      res.status(404).json({NoPostsExist: "There are no posts."})
    )
})

//@route  GET /api/posts/:id
//@desc   Get a post
//@access Public
router.get("/:id", (req, res) => {
  const errors = {}
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        errors.PostDoesNotExist = "This post does not exist."
        res.status(404).json(errors)
      }
      res.json(post)
    })
    .catch(err =>
      res.status(404).json({PostDoesNotExist: "No post with this ID exists"})
    )
})

//@route  POST /api/posts/
//@desc   Add a new post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {errors, isValid} = validatePostInput(req.body)

    if(!isValid) {
      return res.status(400).json(errors)
    }

    const postFields = {}
    postFields.name = req.body.name
    postFields.title = req.body.title
    postFields.text = req.body.text
    postFields.avatar = req.body.avatar
    postFields.user = req.user.id
    postFields.isFeatured = req.body.isFeatured

    //CREATE
    new Post(postFields).save().then(post => res.json(post))
  }
)


//@route  POST /api/posts/id
//@desc   Update a post
//@access Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {errors, isValid} = validatePostInput(req.body)

    if(!isValid) {
      return res.status(400).json(errors)
    }

    const postFields = {}
    postFields.name = req.body.name
    postFields.title = req.body.title
    postFields.text = req.body.text
    postFields.avatar = req.body.avatar
    postFields.user = req.user.id
    postFields.isFeatured = req.body.isFeatured

    Post.findOne({ id: req.body.id })
    .then(post => {
      if (post) {
        //UPDATE
        Post.findOneAndUpdate(
          { id: req.body.id },
          { $set: postFields },
          { new: true }).then(post => {
            res.json(post)
          })
        }
        else {
          errors.PostNotFound = "Post not found. Unable to update."
          res.status(400).json(errors)
        }
    }).catch(err => res.status(400).json(err))
  }
)


//@route  DELETE /api/posts/:id
//@desc   Delete tag by name
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findOneAndRemove({ _id: req.params.id })
      .then(post => {
        // Check for post owner to make sure not anyone can delete
        // This protects from the backend from somebody
        // using tools like postman to delete your posts
        if(post.user.toString() !== req.user.id) {
          // Return unauthorized status
          return res.status(401).json({UserNotAuthorized: "User is not authorized"})
        }

        if(!post) {
          errors.PostNotFound = "Post not found."
          res.status(404).json(errors)
        }
        res.json({ success: true })
      })
      .catch(err => res.status(400).json({PostNotFound: "Post not found."}))
    })
  }
)

// Have to export module so server.js can pick it up
module.exports = router
