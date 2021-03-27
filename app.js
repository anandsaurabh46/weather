const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.sendFile(__dirname+"/weather.html");
});

app.post("/", function(req, res){
	var city = req.body.cityname;
	console.log(city);
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=3d7488335a33000243aa1a980b293850&units=metric"

	https.get(url, function(response){
		console.log(response.statusCode);
		if(response.statusCode===200) {
			response.on("data", function(data){
				const weatherInfo = JSON.parse(data);
				var temp = weatherInfo.main.temp;
				var desc = weatherInfo.weather[0].description;
				var icon = weatherInfo.weather[0].icon;
				var imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
				console.log(temp);
				console.log(desc);
				res.send("The weather in "+city+" is "+desc+"<br>The temperature is "+temp+"<br><img src="+imageURL+">");
			});
		}
		else {
			res.send("City not found, try again");
		}
	});
});

app.listen("3000", function(){
	console.log("server is up and running");
});