const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const redis = require("redis");
var querystring = require("querystring");
var http = require("http");
var fs = require("fs");

// Set Port
const port = 3000;

// Init app
const app = express();

// View Engine\
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// methodOverride
app.use(methodOverride("_method"));

app.listen(port, function() {
  console.log("Server started on port " + port);
});

app.get("/", function(req, res, next) {
  res.render("homepage");
});

app.get("/add", function(req, res, next) {
  res.render("addflight");
});

app.get("/search", function(req, res, next) {
  res.render("SearchAndFilter");
});

app.post("add", function(req, res, next) {
  //   let MSN = req.body.MSN;
  //   let HarnessLength = req.body.HarnessLength;
  //   let GrossWeight = req.body.GrossWeight;
  //   let AtmosphericPressure = req.body.AtmosphericPressure;
  //   let RoomTemperature = req.body.RoomTemperature;
  //   let AirPort = req.body.Air_Port;
  //   let FuelCapacityOnLeftWing = req.body.FuelCapacityOnLeftWing;
  //   let FuelCapacityOnRightwing = req.body.FuelCapacityOnRightwing;
  //   let MaximumAltitudeToBeRun = req.body.MaximumAltitudeToBeRun;
  //   let FlightNumber = req.body.FlightNumber;

  var options = {
    host: "api_gateway",
    port: 4140,
    path: "/addFlightData",
    method: "POST",
    headers: { "content-type": "aplication/json" },
    body: req.body
  };

  var req = http.request(options, function(res) {
    console.log("STATUS: " + res.statusCode);
    console.log("HEADERS: " + JSON.stringify(res.headers));
    res.setEncoding("utf8");
    res.on("data", function(chunk) {
      console.log("BODY: " + chunk);
    });
  });

  req.on("error", function(e) {
    console.log("problem with request: " + e.message);
  });

  // write data to request body
  req.write("data\n");
  req.write("data\n");
  req.end();
});

// Search processing
app.post("/flight/search", function(req, res, next) {
  let id = req.body.optradio;

  var obj = [
    {
      MSN: "123",
      harnessLength: "34.3",
      grossWeight: "3453243.3",
      atmPressure: "234.234",
      roomTemperature: "234.234",
      airport: "Bangalore",
      fuelCapacityLeft: "2452.234",
      fuelCapacityRight: "24524523.34",
      fuelQuantityLeft: "4565445.245",
      fuelQuantityRight: "3453454.454",
      targetMaxAltitude: "32423.234",
      flightNumber: "EK-534"
    },
    {
      MSN: "123",
      harnessLength: "34.3",
      grossWeight: "3453243.3",
      atmPressure: "234.234",
      roomTemperature: "234.234",
      airport: "Bangalore",
      fuelCapacityLeft: "2452.234",
      fuelCapacityRight: "24524523.34",
      fuelQuantityLeft: "4565445.245",
      fuelQuantityRight: "3453454.454",
      targetMaxAltitude: "32423.234",
      flightNumber: "EK-534"
    },
    {
      MSN: "123",
      harnessLength: "34.3",
      grossWeight: "3453243.3",
      atmPressure: "234.234",
      roomTemperature: "234.234",
      airport: "Bangalore",
      fuelCapacityLeft: "2452.234",
      fuelCapacityRight: "24524523.34",
      fuelQuantityLeft: "4565445.245",
      fuelQuantityRight: "3453454.454",
      targetMaxAltitude: "32423.234",
      flightNumber: "EK-534"
    },
    {
      MSN: "123",
      harnessLength: "34.3",
      grossWeight: "3453243.3",
      atmPressure: "234.234",
      roomTemperature: "234.234",
      airport: "Bangalore",
      fuelCapacityLeft: "2452.234",
      fuelCapacityRight: "24524523.34",
      fuelQuantityLeft: "4565445.245",
      fuelQuantityRight: "3453454.454",
      targetMaxAltitude: "32423.234",
      flightNumber: "EK-534"
    },
    {
      MSN: "123",
      harnessLength: "34.3",
      grossWeight: "3453243.3",
      atmPressure: "234.234",
      roomTemperature: "234.234",
      airport: "Bangalore",
      fuelCapacityLeft: "2452.234",
      fuelCapacityRight: "24524523.34",
      fuelQuantityLeft: "4565445.245",
      fuelQuantityRight: "3453454.454",
      targetMaxAltitude: "32423.234",
      flightNumber: "EK-534"
    },
    {
      MSN: "123",
      harnessLength: "34.3",
      grossWeight: "3453243.3",
      atmPressure: "234.234",
      roomTemperature: "234.234",
      airport: "Bangalore",
      fuelCapacityLeft: "2452.234",
      fuelCapacityRight: "24524523.34",
      fuelQuantityLeft: "4565445.245",
      fuelQuantityRight: "3453454.454",
      targetMaxAltitude: "32423.234",
      flightNumber: "EK-534"
    },
    {
      MSN: "123",
      harnessLength: "34.3",
      grossWeight: "3453243.3",
      atmPressure: "234.234",
      roomTemperature: "234.234",
      airport: "Bangalore",
      fuelCapacityLeft: "2452.234",
      fuelCapacityRight: "24524523.34",
      fuelQuantityLeft: "4565445.245",
      fuelQuantityRight: "3453454.454",
      targetMaxAltitude: "32423.234",
      flightNumber: "EK-534"
    }
  ];

  res.render("searchresults", {
    flight: obj
  });
});
