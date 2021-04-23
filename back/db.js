'use strict'
var mysql = require('mysql');
var credenciales = require('./config/database');

var connection = mysql.createConnection(credenciales);

connection.connect((err)=>{
    if (err){
        console.log("error de coneccion");
        console.log(err);
    }
})

module.exports = connection;
