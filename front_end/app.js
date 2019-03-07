const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
var request = require('request');



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

<<<<<<< HEAD


app.listen(port, function () {
=======
app.listen(port, function() {
>>>>>>> 845b17e02fc6161282fa4159f260f65a0bce5aaa
  console.log("Server started on port " + port);
});

app.get("/", function (req, res, next) {
  res.render("homepage");
});

app.get("/add", function (req, res, next) {
  res.render("addflight");
});

app.get("/search", function (req, res, next) {
  res.render("SearchAndFilter");
});

app.post("/flight/add", function (req, res, next) {
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

  console.log("In FlightDATA ADD");
  console.log(req.body);

  var options = {
    method: 'POST',
    url: 'http://api_gateway:4140/api/addFlightData',
    headers:
    {
      'postman-token': 'ecbed902-d38d-96a9-3435-16520e633212',
      'cache-control': 'no-cache',
      'content-type': 'application/json'
    },
    body: req.body,
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });


  res.render('addflight');
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
