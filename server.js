var express = require('express');
var app = express();

//static for html, js files in folder public
app.use(express.static(__dirname + "/public"));

app.listen(3000);
console.log("Server is running on port 3000");