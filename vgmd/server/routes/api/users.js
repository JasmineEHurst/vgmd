// You have to bring in express to use the Router
const express = require('express');
const router = express.Router();

// Takes in a request
router.get('/test', (req, res) =>  res.json({
  msg: 'User resource works'
}));

// Have to export module so server.js can pick it up
module.exports = router;
