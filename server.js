var express = require('express');
var app = express();

//route to our index page
app.get('/',function (req,res){
	res.send("Hello World");
});

app.listen(3000);
console.log("Server is running on port 3000");