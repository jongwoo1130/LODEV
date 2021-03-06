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
var app = express();
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
	
	db.LODEV.find().sort({date:-1}, (function(err,docs){
		res.json(docs);
	}))
	
});

app.post('/itemList', function(req,res){
	if(!req.body.username && !req.body.data && !req.body.location){
		res.status(400).json('emtpy');
	}else{
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
				res.status(403).json('duplicate');
			}
		});
	}
});

app.delete('/itemList/:id',function(req,res){
	var id = req.params.id;
	db.LODEV.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

function getGeo(req, callback, ret){
	geocoder.geocode(req.body.location, function(err,data){
		if(data.results[0]){
			var latitude = data.results[0].geometry.location.lat;
			var longitude = data.results[0].geometry.location.lng;
			callback(req,latitude,longitude,function(current){
				req.body.latitude = latitude;
				req.body.longitude = longitude;
				req.body.temperature = current.temperature;
				req.body.skyicon = current.icon;
				req.body.skycolor = "red";
				return ret(req.body);
			});
		}
	});
}

function getTemperature(req,lat,lng,data){
	var current;
	forecast.get([lat,lng], function(err,weather){
		if(err) return console.log("err in get temp" + err);
		current = weather.currently;
		return data(current);
	});
}


app.listen(3000);
console.log("Server is running on port 3000...");
/*
https.createServer(options, app).listen(3000, function () {
   console.log("Server is running on port 3000...");
});
*/

/************************ Export Functions ************************/

exports.rgbToHex = function(red, green, blue) {

  var redHex   = red.toString(16);
  var greenHex = green.toString(16);
  var blueHex  = blue.toString(16);

  return pad(redHex) + pad(greenHex) + pad(blueHex);

};

function pad(hex) {
  return (hex.length === 1 ? "0" + hex : hex);
}


exports.getTemperature = function (req,lat,lng,data){
	var temperature;
	forecast.get([lat,lng], function(err,weather){
		if(err) return console.log("err in get temp" + err);
		temperature = weather.currently.temperature;
		req.body.temperature = temperature;
		return data(temperature);
	});
}

/************************ Export Functions ************************/