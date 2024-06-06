const express = require("express");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
const https = require("https");
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/", function (req, res) {
    const query = req.body.location;
    const apikey = "c32b743f68b5296720801950a39fce84";
    url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&appid=" +
      apikey +
      "&units=metric";
    https.get(url, function (response) {
      response.on("data", function (data) {
        const weather_data = JSON.parse(data);
        const temp = weather_data.main.temp;
        const des = weather_data.weather[0].description;
        const icon = weather_data.weather[0].icon;
        const imgurl =
          "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write(
          '<div style="background-color: #222; color: #fff; text-align: center; padding: 20px;">'
        );
        res.write('<p style="font-size: 18px;">The weather is currently ' + des + "</p>");
        res.write('<h1 style="font-size: 24px;">The temperature in ' + query + ' is ' + temp + ' degree Celsius.</h1>');
        res.write('<img src="' + imgurl + '" alt="Weather Icon" style="width: 100px; height: 100px;">');
        res.write("</div>");
        res.send();
      });
    });
  });
  

app.listen(3000,function(){
    console.log("Server Running on 3000 port");
});