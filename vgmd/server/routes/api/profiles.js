// You have to bring in express to use the Router
const express = require("express");
const router = express.Router();

//@route  GET /api/profiles/test
//@desc   Tests the profiles route
//@access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Profiles resource works"
  })
);

// Have to export module so server.js can pick it up
module.exports = router;
