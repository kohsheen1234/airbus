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

app.listen(port, function () {
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
app.post("/flight/search", function (req, res, next) {
  let selectedButton = req.body.flight;
  console.log(selectedButton);

  let searchQuery = req.body;

  console.log(searchQuery);


  var payload = {};
  for (var i = 1; i < 2; i++) {
    payload[i + selectedButton] = searchQuery;
  }

  var options = {
    method: 'POST',
    url: 'http://api_gateway:4140/api/search',
    headers:
    {
      'postman-token': 'ecbed902-d38d-96a9-3435-16520e633212',
      'cache-control': 'no-cache',
      'content-type': 'application/json'
    },
    body: payload,
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    res.render("searchresults", {
      flight: body
    });

  });




});
