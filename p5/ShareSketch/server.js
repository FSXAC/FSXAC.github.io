// import frame work express into 'express'
var express = require('express');
var app = express();
var server = app.listen(3000); // port 3000

// host everything in 'public'
app.use(express.static('public'));

console.log("Socket Server Initiated");
