var express = require('express');
//const express = require('express')
var router = require('./routes/routes.js')
var path = require('path');
var app = express();
//const app = expres();
//const port = process.env.PORT || 5000
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use('/', router);
module.exports=app;
