'use strict'
var mysql = require('mysql');
var confSQL = require('./config/database');

var connection = mysql.createConnection(confSQL);

connection.connect((err)=>{
    if (err){
        console.log("error de coneccion");
        console.log(err);
    }
})

module.exports = connection;
