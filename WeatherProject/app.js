const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "5f3f3adc61a495b2f5ef3014a4cb22ff";
    const unit = "metrc"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "#"

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1> The temperature in " + query + " is  " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
     
        })
    })
    
})



app.listen(4500, function() {
    console.log("Server is running on port 4500");
})