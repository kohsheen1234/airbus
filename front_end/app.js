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

// Search Page
app.get("/", function(req, res, next) {
  res.render("flig");
});

// Search processing
app.post("/user/search", function(req, res, next) {
  let id = req.body.id;

  client.hgetall(id, function(err, obj) {
    if (!obj) {
      res.render("searchusers", {
        error: "User does not exist"
      });
    } else {
      obj.id = id;
      res.render("details", {
        user: obj
      });
    }
  });
});

app.listen(port, function() {
  console.log("Server started on port " + port);
});

//add flight page
app.get("/flight/add", function(req, res, next) {
  res.render("addflight");
});

app.post("/flight/add", function(req, res, next) {
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
