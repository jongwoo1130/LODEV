var express = require('express');
var app = express();

//static for html, js files in folder public
app.use(express.static(__dirname + "/public"));

app.get('/itemList', function(req,res){
	console.log("I received a GET request");
	item1 = {
		name: 'Server received the entered text!'
	};

    var itemList = [item1];
    res.json(itemList);
	
});

app.post('/itemList', function(req,res){
    res.json('POST respond');
});

app.listen(3000);
console.log("Server is running on port 3000");