var express = require('express');
var app = express();
var mongojs = require('mongojs');
//first arg = which database, second arg = which collection
var db = mongojs('LODEV',['LODEV']);
var bodyParser = require('body-parser');

//static for html, js files in folder public
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/itemList', function(req,res){
	console.log("I received a GET request");
	
	db.LODEV.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	})
	
});

app.post('/itemList', function(req,res){
	var date = new Date();
	req.body.date = date;
	db.LODEV.insert(req.body, function(err,doc){
		res.json(doc);
	});
});

app.listen(3000);
console.log("Server is running on port 3000");