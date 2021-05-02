'use strict'

const config = require('./config/config');
const rutas = require('./rutas');

var express = require('express');
var app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Allow', 'GET');
  next();
});

app.use('/',rutas);

const port = process.env.PORT || config.port;
app.listen(port, '0.0.0.0', function () {
  console.log('Listening on Port 3000')
})

