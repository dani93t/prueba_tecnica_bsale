'use strict'
var express = require('express');
var app = express();


app.use(express.urlencoded({extended:false}));
app.use(express.json());

module.exports = app;
