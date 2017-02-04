//setup https
var fs = require('fs');
var https = require('https');
var hshkey = fs.readFileSync('server.key');
var hscert = fs.readFileSync('server.crt');

var options = {
	key: hshkey,
	cert: hscert
};

var express = require('express');
var app = require('express')();
var mongojs = require('mongojs');
//first arg = which database, second arg = which collection
var db = mongojs('LODEV',['LODEV']);
var bodyParser = require('body-parser');
var geocoder = require('geocoder');
var Forecast = require('forecast');
var forecast = new Forecast({
  service: 'darksky',
  key: '2786e6ae0696deccfadf1d103ebc591b',
  units: 'celcius',
  cache: true,      // Cache API requests 
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
    minutes: 27,
    seconds: 45
  }
});

//static for html, js files in folder public
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/itemList', function(req,res){
	console.log("I received a GET request");
	
	db.LODEV.find(function(err,docs){
		res.json(docs);
	})
	
});

app.post('/itemList', function(req,res){
	var date = new Date();
	req.body.date = date.toLocaleString();
	var query = {};
	query['data'] = req.body.data;
	db.LODEV.find(query,function(err,doc){
		if(doc.length == 0){
			var obj = getGeo(req,getTemperature,function(result){
				db.LODEV.insert(result, function(err,doc){
					res.json(doc);
				});
			});	
		}else{
			res.json('duplicate');
		}
	});
});

function getGeo(req, callback, ret){
	geocoder.geocode(req.body.location, function(err,data){
		if(data.results[0]){
			var latitude = data.results[0].geometry.location.lat;
			var longitude = data.results[0].geometry.location.lng;
			callback(req,latitude,longitude,function(temperature){
				req.body.latitude = latitude;
				req.body.longitude = longitude;
				req.body.temperature = temperature;
				return ret(req.body);
			});
		}
	});
}

function getTemperature(req,lat,lng,data){
	var temperature;
	forecast.get([lat,lng], function(err,weather){
		if(err) return console.log("err in get temp" + err);
		temperature = weather.currently.temperature;
		req.body.temperature = temperature;
		return data(temperature);
	});
}

//app.listen(3000);
https.createServer(options, app).listen(3000, function () {
   console.log("Server is running on port 3000...");
});
